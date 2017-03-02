declare let gantt: any;

export class Chart {
    buildChart(data) {
        let link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('type', 'text/css');
        link.setAttribute('href', 'assets/css/dhtmlxgantt.css');

        if (typeof link != "undefined")
            document.getElementsByTagName("head")[0].appendChild(link);

        gantt.config.columns = [
            {name:"name", label: "Task name", tree: true},
        ];
        gantt.config.autosize = "y";
        gantt.init("chart");
        gantt.parse({data: data});
    }
}
