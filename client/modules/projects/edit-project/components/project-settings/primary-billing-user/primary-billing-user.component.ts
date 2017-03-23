import {Component, OnInit, Input} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";
import {FormControl} from "@angular/forms";
import {User} from "client/entities/entities";

@Component({
    selector: 'primary-billing-user',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/primary-billing-user/primary-billing-user.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/project-settings/primary-billing-user/primary-billing-user.component.css'
    ],
})
export class PrimaryBillingUser implements OnInit {
    @Input() projectId;
    userCtrl: FormControl;
    filtered: any;
    users:    User[];
    isEdit:   boolean = false;
    pbrUser:  User;
    isBillingUser: boolean;
    companyPbr: User;
    pbrLabel;

    constructor(protected AuthService: AuthService,
                protected MsProjectClientService: MsProjectClientService,
                protected MsUserClientService: MsUserClientService) {
        this.userCtrl = new FormControl();
        this.filtered = this.userCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterUsers(name));
    }

    ngOnInit(): void {
            Promise.all([
                this.MsProjectClientService.getPbrUser(this.projectId),
                this.MsUserClientService.getCompanyPbr(this.AuthService.company.id),
                this.MsProjectClientService.getProjectUsers(this.projectId),
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
        this.MsProjectClientService.update(this.projectId, {
            billing__user_fk_id: null
        }).then(result => {
            this.pbrUser = this.companyPbr;
            this.isEdit  = false;

            this.checkIsBillingUser();
        });
    }

    savePbr() {
        this.MsProjectClientService.setPbrUser(this.pbrUser.id, this.projectId)
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
            this.isBillingUser = this.AuthService.authUser.id == this.pbrUser.id || this.companyPbr.id == this.AuthService.authUser.id;
        }
    }

    cancel() {
        this.isEdit = false;
    }
}
