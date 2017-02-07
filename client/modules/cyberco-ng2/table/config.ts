export class TableConfig {
    constructor() {
    }

    public columns;
    public serviceParams: {url: string, headers: {}} = {url: '', headers: {}};

    public setColumns(columns: any) {
        this.columns = columns;
    }

    public setServiceParams(url, headers = {}) {
        this.serviceParams['url'] = url;
        this.serviceParams['headers'] = headers;
    }
}
