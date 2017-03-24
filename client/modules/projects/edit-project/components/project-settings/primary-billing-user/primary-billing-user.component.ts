import {Component, OnInit} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";
import {FormControl} from "@angular/forms";
import {User} from "client/entities/entities";
import {PipeConnectionService} from "client/service/pipe-connection.service";

@Component({
    selector: 'primary-billing-user',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/primary-billing-user/primary-billing-user.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/project-settings/primary-billing-user/primary-billing-user.component.css'
    ],
})
export class PrimaryBillingUser implements OnInit {
    userCtrl: FormControl;
    filtered: any;
    users:    User[];
    isEdit:   boolean = false;
    pbrUser:  User;
    isBillingUser: boolean;
    companyPbr: User;

    constructor(protected AuthService: AuthService,
                protected pipeConnectionService: PipeConnectionService,
                protected MsProjectClientService: MsProjectClientService,
                protected MsUserClientService: MsUserClientService) {
        this.userCtrl = new FormControl();
        this.filtered = this.userCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterUsers(name));
    }

    ngOnInit(): void {
            Promise.all([
                this.MsProjectClientService.getPbrUser(this.pipeConnectionService.project.id),
                this.MsUserClientService.getCompanyPbr(this.AuthService.company.id),
                this.MsProjectClientService.getProjectUsers(this.pipeConnectionService.project.id),
            ])
            .then(resultsList => {
                this.pbrUser = resultsList[0];
                this.users = resultsList[2];
                this.companyPbr = resultsList[1];

                this.checkIsBillingUser();
            });
    }

    displayFn(value: any): string {
        return value && typeof value === 'object' ? value.first_name + ' ' + value.last_name + ' ' + '(' + value.email + ')' : value;
    }

    filterUsers(val: string) {
        return val ? this.users.filter((s) => new RegExp(val, 'gi').test(s.email)) : this.users;
    }

    editPbr() {
        this.isEdit = true;
    }

    resetPbrToCompanyDefault() {
        this.MsProjectClientService.update(this.pipeConnectionService.project.id, {
            billing__user_fk_id: null
        }).then(result => {
            this.pbrUser = this.companyPbr;
            this.isEdit  = false;

            this.checkIsBillingUser();
        });
    }

    savePbr() {
        this.MsProjectClientService.setPbrUser(this.pbrUser.id, this.pipeConnectionService.project.id)
            .then(user => {
                this.pbrUser = user;
                this.isEdit  = false;

                this.checkIsBillingUser();
            });
    }

    checkIsBillingUser() {
        if (!this.pbrUser) {
            this.isBillingUser = false;
        }
        else {
            this.isBillingUser = [this.pbrUser.id, this.companyPbr.id, this.pipeConnectionService.project.creator__user_fk_id.id].indexOf(this.AuthService.authUser.id) > -1;
        }
    }

    cancel() {
        this.isEdit = false;
    }
}
