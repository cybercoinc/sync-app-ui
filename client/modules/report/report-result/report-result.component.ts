import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from "client/service/auth.service";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";
import 'rxjs/add/operator/startWith';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: "report-result",
    templateUrl: 'client/modules/report/report-result/report-result.component.html',
    styleUrls: ['client/modules/report/report-result/report-result.component.css'],
})
export class ReportResultComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                protected MsUserClientService: MsUserClientService,
                protected ActivatedRoute: ActivatedRoute) {

    }

    protected reportId: number;
    public reportInformation: any;
    public reportData: any;

    ngOnInit() {
        this.ActivatedRoute.params.forEach((params) => {
            this.reportId = +params['reportId'];
        });

        return Promise.all([
            this.getReportInformation(),
            this.getReportData()
        ]);
    }

    getReportInformation() {
        return this.MsProjectClientService.getReportConfigurations(this.reportId)
            .then(result => {
                return this.reportInformation = result;
            });
    }

    getReportData() {
        return this.MsProjectClientService.getReportData(this.reportId)
            .then(result => {
                return this.reportData = result
            });
    }

}