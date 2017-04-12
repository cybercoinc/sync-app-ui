import {Component, OnInit} from "@angular/core";
import {Project, User} from "client/entities/entities";
import {PipeConnectionService} from "client/service/pipe-connection.service";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from "client/service/auth.service";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";

@Component({
    selector: 'separate-invoice',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/separate-invoice/separate-invoice.component.html',
})
export class SeparateInvoice implements OnInit {
    project: Project;
    isPrbUser: boolean;
    pbrUser: User;
    companyPbr: User;

    constructor(protected pipeConnectionService: PipeConnectionService,
                protected msProjectClient: MsProjectClientService,
                protected msUserClient: MsUserClientService,
                protected authService: AuthService) {}

    ngOnInit(): void {
        this.project = this.pipeConnectionService.project;

        Promise.all([
            this.msProjectClient.getPbrUser(this.pipeConnectionService.project.id),
            this.msUserClient.getCompanyPbr(this.authService.company.id),
        ])
            .then(results => {
                this.pbrUser = results[0];
                this.companyPbr = results[1];

                this.isPrbUser = [this.pbrUser.id, this.companyPbr.id, this.pipeConnectionService.project.creator__user_fk_id.id].indexOf(this.authService.authUser.id) > -1;
            });
    }

    switchStatus() {
        this.msProjectClient.update(this.project.id, {
            is_separate_invoice: this.project.is_separate_invoice,
        });
    }
}
