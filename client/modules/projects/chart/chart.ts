import {Output, EventEmitter} from "@angular/core";

declare let gantt: any;

export class Chart {
    @Output() emitter = new EventEmitter();

    buildChart(data) {
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'assets/css/dhtmlxgantt.css');

        if (typeof link != "undefined") {
            document.getElementsByTagName("head")[0].appendChild(link);
        }

        gantt.config.task_height = 16;
        gantt.config.row_height  = 40;

        gantt.config.columns = [
            {name:"text", label: "Task name", tree: true},
            {name:"add", label:"", width:44 }
        ];
        gantt.config.autosize = "y";

        gantt.addTaskLayer(this.addBaseLines);

        gantt.attachEvent("onTaskLoading", function(task){
            task.planned_start = gantt.date.parseDate(task.planned_start, "xml_date");
            task.planned_end = gantt.date.parseDate(task.planned_end, "xml_date");
            return true;
        });

        gantt.attachEvent("onBeforeTaskAdd", function(id,item){
            this.emitter.emit(item);
        });

        gantt.init("chart");
        gantt.parse({data: data});

        gantt.sort('row_number', false);
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
