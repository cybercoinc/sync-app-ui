declare let gantt: any;
declare let $: any;

export class Chart {
    resources: any;
    assignees: any;

    constructor(resources, assignees) {
        this.resources = resources;
        this.assignees = assignees;

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

    buildChart(data) {
        let self = this;

        gantt.config.task_height = 16;
        gantt.config.row_height  = 40;

        gantt.config.columns = [
            {name:"text", label: "Task name", tree: true},
            {name:"resources", label: "Resource", template: (obj) => {
                return obj.resources == undefined ? '' : obj.resources;
            }},
            {name:"add", label:"", width:44 },
        ];

        gantt.form_blocks["resources"] = this.buildResourceDropdown(this.resources);
        gantt.form_blocks["assignees"] = this.buildAssigneeDropdown(this.assignees);

        gantt.config.lightbox.sections = [
            {name:"description", height:38, map_to:"text", type:"textarea", focus: true},
            {name:"resources", map_to:"resources", type:"resources"},
            {name:"assignees", map_to:"assignees", type:"assignees"},
            {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"},
            {name:"time", type:"time", map_to:"auto"},
        ];

        gantt.locale.labels["section_parent"]    = "Parent task";
        gantt.locale.labels["section_assignees"] = "Assignees";
        gantt.locale.labels["section_resources"] = "Resources";

        gantt.config.autosize = "y";

        gantt.attachEvent("onTaskLoading", function(task){
            task.planned_start = gantt.date.parseDate(task.planned_start, "xml_date");
            task.planned_end   = gantt.date.parseDate(task.planned_end, "xml_date");
            return true;
        });

        gantt.init("chart");
        gantt.parse({data: data});

        gantt.sort('row_number', false);

        gantt.attachEvent("onLightbox", function (task_id){
            $('#resources-select').on('change', (e) => {
                let resource = self.getResource();

                if (resource) {
                    $('#assignee-select')
                        .prop('disabled', false)
                        .html(self.getAssigneeList(resource.id))
                        .select2();
                }
                else {
                    $('#assignee-select').empty();
                    $('#assignee-select').prop('disabled', true);
                }
            });

            $('select.select2').select2();
        });

        gantt.attachEvent("onAfterLightbox", function (){
            $('#resources-select').off('change');
            return true;
        });
    }

    getAssigneeList(resourceId) {
        let html = '';

        this.assignees.forEach(item => {
            if (item.resource_id == resourceId) {
                html += '<option value="' + item.id + '">' + item.email + '</option>';
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

        gantt.addTaskLayer(this.addBaseLines);
        gantt.parse({data: data});
        gantt.refreshData();
    }

    getResource() {
        return this.resources.find(e => e.name == $('#resources-select').val());
    }

    getTasks() {
        return gantt.serialize().data;
    }

    exportToPdf() {
        gantt.exportToPDF({
            header:'<link rel="stylesheet" href="//dhtmlx.com/docs/products/dhtmlxGantt/common/customstyles.css" type="text/css">'
        });
    }

    refreshAssigneeList(html) {
        $('#assignee-select')
            .prop('disabled', false)
            .html(html)
            .select2();
    }

    addBaseLines(task): any {
        if (task.planned_start && task.planned_end) {
            let sizes = gantt.getTaskPosition(task, task.planned_start, task.planned_end);
            let el = document.createElement('div');
            el.className = 'baseline';
            el.style.left = sizes.left + 'px';
            el.style.position = 'absolute';
            el.style.height = '12px';
            el.style.background = '#ffd180';
            el.style.width = sizes.width + 'px';
            el.style.top = sizes.top + gantt.config.task_height  + 13 + 'px';
            return el;
        }
        return false;
    }

    buildResourceDropdown(options) {
        let self = this;

        return {
            render: function(sns){
                let html = '<select id="resources-select">' +
                           '<option value="0">No resource</option>';

                options.forEach(item => {
                    html += '<option value="' + item.name + '">' + item.name + '</option>'
                });
                html += '</select>';

                return '<div class="gantt_cal_ltext">' + html + '</div>';
            },

            set_value: function(node,value,task,section){
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
            },
            get_value: function(node,task,section){
                if (self.getResource()) {
                    return $('#resources-select').val();
                }
            },
            focus: function(node){}
        };
    }

    buildAssigneeDropdown(options) {
        return {
            render: function(sns){
                return '<select id="assignee-select" multiple="multiple" class="select2"></select>';
            },

            set_value: function(node,value,task,section){},
            get_value: function(node,task,section){
                if ($('#assignee-select').val()) {
                    return $('#assignee-select').val();
                }
            },
            focus: function(node){}
        };
    }
}
