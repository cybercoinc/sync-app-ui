import {Component} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import 'rxjs/add/operator/startWith';
import {Router} from "@angular/router";

@Component({
    selector: "report",
    templateUrl: 'client/modules/report/index/reports.component.html',
})
export class ReportsComponent {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected router: Router
               ) {
    }

    goToReport() {
        return this.router.navigate(['/utilization-report']);
    }
}