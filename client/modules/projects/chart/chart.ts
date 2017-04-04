declare let gantt: any;
declare let $: any;

export class Chart {
    resources: any;
    assignees: any;
    isAllowEdit: boolean;
    weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    notWorkingDays = [0 ,6];

    constructor(assignees, isAllowEdit, resources = null) {
        this.resources = resources;
        this.assignees = assignees;
        this.isAllowEdit = isAllowEdit;

        this.loadScripts();
        this.attachEvents();
        this.setConfiguration();
    }

    setWorkingDays(working_days, holidays) {
        if (holidays) {
            holidays.forEach(date => {
                gantt.setWorkTime({date: new Date(date), hours: false});
            });
        }

        if (working_days) {
            this.weekDays.forEach((day, index) => {
                if (working_days.indexOf(day) < 0) { // not working day
                    this.notWorkingDays.push(index);

                    gantt.setWorkTime({day: index, hours: false});
                }
                else { // working day
                    gantt.setWorkTime({day: index, hours: true});
                }
            });
        }
    }

    getChartUndoStackLength() {
        return gantt.getUndoStack().length;
    }

    getChartRedoStackLength() {
        return gantt.getRedoStack().length;
    }

    buildChart(data) {
        let self = this;

        if (this.resources) {
            gantt.form_blocks["resources"] = this.buildResourceDropdown(this.resources);
        }

        gantt.form_blocks["assignees"] = this.buildAssigneeDropdown(this.assignees);

        let sections = [
            {name:"description", height:38, map_to:"text", type:"textarea", focus: true},
            {name:"resources", map_to:"resources", type:"resources"},
            {name:"assignees", map_to:"assignees", type:"assignees"},
            {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"},
            {name:"time", type:"duration", map_to:"auto"},
        ];

        if (!this.resources) {
            sections.splice(1, 1);
        }

        gantt.config.lightbox.sections = sections;

        gantt.locale.labels["section_parent"]    = "Parent task";
        gantt.locale.labels["section_assignees"] = "Assignees";

        if (this.resources) {
            gantt.locale.labels["section_resources"] = "Resources";
        }

        gantt.init("chart");

        gantt.clearAll();
        gantt.parse({data: data.tasks, links: data.links});
        gantt.sort('row_number', false);

        gantt.attachEvent("onLightbox", (task_id => {
            if (self.resources) {
                $('#resources-select').on('change', (e) => {
                    let resource = self.getResource(),
                        task = gantt.getTask(task_id);

                    if (resource) {
                        $('#assignee-select')
                            .prop('disabled', false)
                            .html(self.getAssigneeList(task, resource.id))
                            .select2();
                    }
                    else {
                        $('#assignee-select').empty();
                        $('#assignee-select').prop('disabled', true);
                    }
                });

                let task = gantt.getTask(task_id);
                if (task.type == gantt.config.types.project) {
                    let id = gantt.config.lightbox.project_sections[1].inputId;
                    $('#' + id).parents('.gantt_wrap_section').hide();
                }
            }

            $('select.select2').select2();
        }));

        gantt.attachEvent("onAfterLightbox", (() => {
            $('#resources-select').off('change');

            return true;
        }));
    }

    getAssigneeList(task, resourceId) {
        let html = '';

        this.assignees.forEach(item => {
            let selected = '';
            if (!task.assignees || task.assignees.find(e => e == item.id)) {
                selected = 'selected';
            }

            if (item.resource_id == resourceId) {
                html += '<option value="' + item.id + '" ' + selected + '>' + item.email + '</option>';
            }
        });

        return html;
    }

    applyBaseline(baselines) {
        let data = this.getTasks();

        data.forEach(task => {
            let baseline = baselines.find(item => item.id == task.id);

            if (baseline != undefined)  {
                task.planned_start = baseline.start_date;
                task.planned_end   = baseline.end_date;
            }
        });

        this.refreshData(data);
    }

    refreshData(data = null) {
        if (!data) {
            data = this.getTasks();
        }
        gantt.addTaskLayer(this.addBaseLines);
        gantt.parse({data: data});
        gantt.refreshData();
    }

    getResource() {
        return this.resources.find(e => e.name == $('#resources-select').val());
    }

    getTasks() {
        return gantt.serialize().data.map(item => {
            item.has_children = gantt.hasChild(item.id) > 0;
            item.row_number   = gantt.getGlobalTaskIndex(item.id);
            item.open         = true;

            if (gantt.hasChild(item.id) > 0) {
                item.type = 'project';
            }

            return item;
        });
    }

    getLinks() {
        return gantt.getLinks();
    }

    exportToPdf(serverUrl) {
        gantt.exportToPDF({
            header:'<link rel="stylesheet" href="//dhtmlx.com/docs/products/dhtmlxGantt/common/customstyles.css" type="text/css">',
            server: serverUrl
        });
    }

    addBaseLines(task): any {
        if (task.planned_start && task.planned_end) {
            let sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
            let el = document.createElement('div');
            el.className = 'baseline';
            el.style.left = sizes.left + 'px';
            el.style.position = 'absolute';
            el.style.height = '7px';
            el.style.background = '#bbbbbb';
            el.style.width = sizes.width + 'px';
            el.style.top = sizes.top + gantt.config.task_height  + 13 + 'px';
            return el;
        }

        return false;
    }

    buildResourceDropdown(options) {
        let self = this;

        return {
            render: (sns => {
                let html = '<select id="resources-select">' +
                           '<option value="0">No resource</option>';

                options.forEach(item => {
                    html += '<option value="' + item.name + '">' + item.name + '</option>'
                });
                html += '</select>';

                return '<div class="gantt_cal_ltext">' + html + '</div>';
            }),

            set_value: ((node,value, task, section) => {
                if (!value) { // new task
                    $('#resources-select option').first().prop('selected', true);
                    $('#assignee-select').empty().prop('disabled', true);
                }
                else {
                    let resource = self.resources.find(e => e.name == value);
                    if (resource) {
                        $('#resources-select').val(resource.name).change();
                    }
                }
            }),
            get_value: ((node, task, section) => {
                if (self.getResource()) {
                    return $('#resources-select').val();
                }
            }),
            focus: (node => {})
        };
    }

    buildAssigneeDropdown(options) {
        let self = this;

        return {
            render: (sns => {
                let attributes = {
                    'id': "assignee-select",
                    'class': "select2"
                };

                if (self.resources) {
                    attributes['multiple'] = 'multiple';
                }

                let html = '<select';
                for (let attr in attributes) {
                    if (attributes.hasOwnProperty(attr)) {
                        html += ' ' + attr + '=' + attributes[attr];
                    }
                }
                return html + '></select>';
            }),

            set_value: ((node, value, task, section) => {
                if (value && task.assignees) {
                    $('#assignee-select')
                        .prop('disabled', false)
                        .html(self.getAssigneeList(task, self.getResource().id))
                        .select2();
                }
                else {

                }
            }),
            get_value: ((node, task, section) => {
                if ($('#assignee-select').val()) {
                    return $('#assignee-select').val();
                }
            }),
            focus: (node => {})
        };
    }

    loadScripts() {
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'assets/css/dhtmlxgantt.css');

        if (typeof link != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(link);
        }

        let exportJs = document.createElement('script');
        exportJs.setAttribute('src', 'assets/js/api.js');

        if (typeof exportJs != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(exportJs);
        }

        exportJs = document.createElement('script');
        exportJs.setAttribute('src', 'assets/js/select2.min.js');

        if (typeof exportJs != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(exportJs);
        }

        link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'assets/css/select2.min.css');

        if (typeof link != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    }

    undo() {
        if (gantt.getUndoStack().length < 1) {
            return false;
        }

        gantt.undo();
    }
    redo() {
        if (gantt.getRedoStack().length < 1) {
            return false;
        }

        gantt.redo();
    }

    attachEvents() {
        let self = this;

        gantt.attachEvent("onGridResizeEnd", function(old_width, new_width){
            let columnsWidth = {};

            gantt.config.columns.forEach(column => {
                columnsWidth[column.name] = column.width;
            });

            localStorage.setItem('columns_width', JSON.stringify(columnsWidth));

            return true;
        });

        gantt.attachEvent("onAfterTaskAdd", function(id, item){
            let data = self.getTasks();
            self.refreshData(data);
        });

        gantt.attachEvent("onBeforeLightbox", (id => {
            let task = gantt.getTask(id);
            if ((task.progress * 100) < 1) {
                task.progress = 0;
            }

            return true;
        }));

        gantt.attachEvent("onTaskLoading", (task => {
            if (task.has_children) {
                task.type = gantt.config.types.project;
            }

            task.planned_start = gantt.date.parseDate(task.planned_start, "xml_date");
            task.planned_end   = gantt.date.parseDate(task.planned_end, "xml_date");

            return true;
        }));

        gantt.attachEvent("onAfterTaskUpdate", function(id,item){
            if (item.parent == 0) {
                return;
            }

            let parentTask = gantt.getTask(item.parent),
                childs = gantt.getChildren(parentTask.id),
                totalProgress = 0;

            for (let i = 0; i < childs.length; i++) {
                let task = gantt.getTask(childs[i]);
                totalProgress += parseFloat(task.progress || 0);
            }

            parentTask.progress = (totalProgress / childs.length).toFixed(2);
            gantt.updateTask(parentTask.id);
        });
    }

    setConfiguration() {
        let self = this;

        gantt.config.task_height = 16;
        gantt.config.row_height  = 40;
        gantt.config.readonly    = !this.isAllowEdit;
        gantt.config.keep_grid_width = true;

        let savedColumnsWidth = localStorage.getItem('columns_width'),
            columnsWidth = {
                text: 200,
                progress: 'auto',
                resources: 'auto',
            };
        if (savedColumnsWidth) {
            columnsWidth = JSON.parse(savedColumnsWidth);
        }

        gantt.config.columns = [
            {name:"text", label: "Task name", tree: true, width: columnsWidth.text},
            {name:"progress", label: "Complete %", width: columnsWidth.progress, template: (obj) => {
                if (obj.progress) {
                    return (obj.progress * 100).toFixed(0);
                }

                return '0';
            }},
        ];

        if (this.resources) {
            gantt.config.columns.push({name:"resources", label: "Resource", width: columnsWidth.resources, template: (obj) => {
                return obj.resources == undefined ? '' : obj.resources;
            }});
        }

        if (this.isAllowEdit) {
            gantt.config.columns.push({name:"add", label:"", width:44 });
        }
        gantt.config.grid_resize        = true;
        gantt.config.auto_scheduling    = true;
        gantt.config.work_time          = true;
        gantt.config.autosize           = "y";
        gantt.config.xml_date           = "%d-%m-%Y";
        gantt.templates.task_cell_class = ((task, date) => {
            if(self.notWorkingDays.indexOf(date.getDay()) > -1){
                return "not-working-day";
            }
        });
        gantt._is_lightbox_timepicker = (() => {return true});
    }
}
