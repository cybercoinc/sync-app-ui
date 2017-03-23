import {Component} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {User} from "client/entities/entities";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";
import {FormControl} from "@angular/forms";

@Component({
    selector: 'company',
    templateUrl: 'client/modules/billing/company/company.component.html',
    styleUrls: ['client/modules/billing/company/company.component.css'],
})
export class CompanyComponent {
    userCtrl: FormControl;
    filtered: any;


    currentPBRUser: any;
    pbrId = null;
    company = null;
    usersList = [];
    ddUsersList = [];
    private isBillingUser: boolean = false;
    isEditMode: boolean = false;
    me: User = null;

    constructor(protected MsUserClientService: MsUserClientService,
                protected AuthService:         AuthService) {
        this.userCtrl = new FormControl();
        this.filtered = this.userCtrl.valueChanges
            .startWith(null)
            .map(name => this.filterUsers(name));
    }

    ngOnInit(): void {
        this.getSettings()
            .then(() => {
                this.isBillingUser = (this.AuthService.authUser.id == this.pbrId);
            });
    }

    displayFn(value: any): string {
        return value && typeof value === 'object' ? value.value : value;
    }

    filterUsers(val: string) {
        return val ? this.ddUsersList.filter((s) => new RegExp(val, 'gi').test(s.value)) : this.ddUsersList;
    }

    saveUser(){
        this.MsUserClientService.updatePbr(this.company.id, this.currentPBRUser.key).then(() => {
            this.isEditMode = false;
            this.currentPBRUser = this.currentPBRUser.value;

            this.isBillingUser = (this.AuthService.authUser.id == this.currentPBRUser.key);
        })
    }

    cancel() {
        this.isEditMode = false;
    }

    showEditPBR() {
        this.isEditMode = !this.isEditMode;
    }

    getSettings() {
        return this.MsUserClientService.getCompany(this.AuthService.company.id)
            .then(company => {
                this.company = company;
                if (company.pbr) {
                    this.pbrId = company.pbr.id;
                    this.currentPBRUser = company.pbr.first_name+' '+company.pbr.last_name+' ('+company.pbr.email+')';
                }

                if (company) {
                    this.MsUserClientService.getCompanyUsers(company.id).then(usersList => {
                        this.usersList = usersList;

                        usersList.forEach(user => {
                            this.ddUsersList.push({
                                key:  user.id,
                                value: user.first_name+' '+user.last_name+' ('+user.email+')'
                            });
                        });
                    });
                }
            });
    }
}
