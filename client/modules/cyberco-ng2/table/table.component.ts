import {Component, Input, OnInit} from "@angular/core";
import {TableService} from "client/modules/cyberco-ng2/table/table.service";
import {TableConfig} from "client/modules/cyberco-ng2/table/config";
import {LoaderService} from "client/modules/cyberco-ng2/table/components/loader.service";

@Component({
    selector: 'cyberco-data-table',
    template: `
        <div>
            <div class="data-table-list">
                <table class="md-data-table">
                    <thead>
                    <tr>
                        <th *ngFor="let column of config.columns" [class.hidden]="!column.visible" width="{{column.width}}">
                            {{column.label}}
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr  [class.hidden]="!LoaderService.isVisible">
                        <td [colSpan]="config.columns.length">
                            <loader-spinner [is-visible]="LoaderService.isVisible"></loader-spinner>
                        </td>
                    </tr>
                    <tr *ngFor="let data of resData" [class.hidden]="LoaderService.isVisible">
                        <td *ngFor="let column of config.columns" [class.hidden]="!column.visible">
        
                            <div *ngIf="column.type === 'date'">
                                {{ data[column.data] | date: column.format }}
                            </div>
        
                            <div *ngIf="column.type === 'text'">{{data[column.data]}}</div>
        
                            <div *ngIf="column.type === 'button'">
                                <button md-raised-button color="default" [routerLink]="[column.rout, data['id']]">
                                    {{column.label}}
                                </button>
                            </div>
        
                            <div *ngIf="column.type === 'link'">
                                <a [routerLink]="[column.rout, data['id']]">
                                    {{data[column.data]}}
                                </a>
                            </div>
                        </td>
                    </tr>
                    <tr [class.hidden]="resData.length"><td [colSpan]="config.columns.length">
                        <span class="no-data">There is no data </span>
                    </td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `,
    styles: [`
        .data-table-list {
            border-radius: 4px;
            border: 1px solid rgba(0, 0, 0, 0.12);
            margin-bottom: 16px;
            -webkit-transition: 0.02s padding cubic-bezier(0.35, 0, 0.25, 1);
            transition: 0.02s padding cubic-bezier(0.35, 0, 0.25, 1);
            position: relative;
            padding-bottom: 0;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
                        0px 1px 1px 0px rgba(0, 0, 0, 0.14),
                        0px 2px 1px -1px rgba(0, 0, 0, 0.12);
        }
        
        .md-data-table {
            display: table;
            font-size: 13px;
            border-spacing: 0;
            border-collapse: collapse;
        
            box-sizing: border-box;
            width: 100%;
        }
        
        .no-data {
            display: inline-block;
            margin-left: 40%; 
        }
        
        thead {
            display: table-header-group;
            vertical-align: middle;
            border-color: inherit;
        }
        
        tbody {
            display: table-row-group;
            vertical-align: middle;
        }
        
        tr {
            position: relative;
            height: 48px;
            vertical-align: middle;
            display: table-row;
        }
        
        
        td, th {
            display: table-cell;
            vertical-align: inherit;
        }
        
        th {
            text-align: left;
            font-size: 15px;
            padding: 1% 2% 1% 2%;
        
            text-overflow: ellipsis;
            box-sizing: border-box;
            font-family: Roboto, 'Helvetica Neue', sans-serif;
        }
        
        td {
            position: relative;
            vertical-align: middle;
            height: 48px;
            border-top: 1px solid rgba(0, 0, 0, 0.12);
            border-bottom: 1px solid rgba(0, 0, 0, 0.12);
            box-sizing: border-box;
            color: rgba(0, 0, 0, 0.87);
            padding-left: 2%;
        }
    `],
})
export class TableComponent implements OnInit {
    constructor(protected service: TableService, protected LoaderService: LoaderService) {}

    public    resData = [{}];
    protected filters = {};

    ngOnInit() {
        this.service.url = this.config.serviceParams.url;
        this.service.headers = this.config.serviceParams.headers;

        this.refreshData();
    }

    public refreshData() {
        this.LoaderService.isVisible = true;

        this.service.getData(this.filters)
            .then(result => {
                this.resData = result;
                this.LoaderService.isVisible = false;
            });
    }

    public addFilter(key, value) {
        this.filters[key] = value;
    }

    // todo

    @Input('config')  config:  TableConfig;
}
