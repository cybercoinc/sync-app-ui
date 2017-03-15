declare let gantt: any;
declare let $: any;

export class Chart {
    model: any;

    constructor() {
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
        gantt.config.task_height = 16;
        gantt.config.row_height  = 40;

        gantt.config.columns = [
            {name:"text", label: "Task name", tree: true},
            {name:"assignee", label: "Assignee"},
            {name:"add", label:"", width:44 },
        ];

        gantt.config.lightbox.sections = [
            {name:"description", height:38, map_to:"text", type:"textarea"},
            {name:"parent", type:"parent", allow_root:"true", root_label:"No parent"},
            {name:"time", type:"time", map_to:"auto"},
        ];

        gantt.locale.labels["section_parent"]   = "Parent task";
        gantt.locale.labels["section_assignee"] = "Assignee";

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
            $('.select2').select2();
        });
    }

    applyBaseline(baselines) {
        let data = this.getTasks();

        data.forEach(task => {
            let baseline = baselines.find(item => item.id == task.id);

            if (baseline != undefined)  {
                task.planned_start = baseline.planned_start;
                task.planned_end   = baseline.planned_end;
            }
        });

        gantt.addTaskLayer(this.addBaseLines);
        gantt.parse({data: data});
        gantt.refreshData();
    }

    getTasks() {
        return gantt.serialize().data;
    }

    exportToPdf() {
        gantt.exportToPDF({
            header:'<link rel="stylesheet" href="//dhtmlx.com/docs/products/dhtmlxGantt/common/customstyles.css" type="text/css">'
        });
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
}
