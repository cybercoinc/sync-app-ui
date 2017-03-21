import {Component, OnInit} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {User} from "client/entities/entities";
import {ActivatedRoute} from "@angular/router";
import {MsUserClientService} from "../../../../../service/microservices/ms-user-client.service";

@Component({
    selector: 'project-settings',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/project-settings.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/project-settings/project-settings.component.css'
    ],
})
export class ProjectSettingsComponent implements OnInit {
    constructor(protected AuthService: AuthService,
                protected MsProjectClientService: MsProjectClientService,
                protected MsUserClientService: MsUserClientService,
                protected ActivatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        this.ActivatedRoute.parent.params.forEach((params) => {
            this.projectId = +params['project_id'];
        });

        return this.MsProjectClientService.syncAssignees(this.projectId)
            .then(() => {
                return Promise.all([
                    this.MsProjectClientService.getPbrUser(this.projectId),
                    this.MsProjectClientService.getProjectUsers(this.projectId),
                    this.MsUserClientService.getCompanyPbr(this.AuthService.company.id)
                ])
            })
            .then(resultsList => {
                this.pbrUser = resultsList[0];
                this.usersList = resultsList[1];

                this.isBillingUser = this.AuthService.authUser.id == this.pbrUser.id || resultsList[2].id == this.AuthService.authUser.id;

                this.usersList.forEach(user => {
                    this.users.push({
                        name: user.id,
                        value: user.first_name + ' ' + user.last_name + '(' + user.email + ')'
                    });
                });
            });
    }

    editPbr() {
        this.isEdit = true;
    }

    savePbr(user) {
        this.MsProjectClientService.setPbrUser(user.model, this.projectId)
            .then(user => {
                this.pbrUser = user;
                this.isEdit = false;
            });
    }

    cancel() {
        this.isEdit = false;
    }

    protected projectId: number;
    protected usersList: User[];
    protected pbrUser: User;
    protected isEdit: boolean = false;
    protected users: any = [];
    private isBillingUser: boolean = false;
}
