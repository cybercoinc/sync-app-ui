import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';
import {AuthService} from 'client/service/auth.service';
import {WizardComponentInterface} from 'client/intefraces/wizard-component.interface';
import {ProcoreTodoColumn, SmartsheetSheetColumn} from 'client/entities/entities';

@Component({
    moduleId: module.id,
    selector: 'working-days-matching',
    templateUrl: 'working-days-matching.component.html',
    styleUrls: ['working-days-matching.component.css']
})
export class WorkingDaysMatchingComponent implements OnInit, WizardComponentInterface {

    constructor(protected MsProjectClientService: MsProjectClientService,
                protected MsSyncClientService: MsSyncClientService,
                protected AuthService: AuthService) {
    }

    ngOnInit() {

    }

    performAction() {
        // todo submit this.model to service
        console.log('action performed');
    }

    @Input('sheet-id') smartsheetSheetId: number;

    public workingDays = {
        mon: true,
        tue: true,
        wed: true,
        thu: true,
        fri: true,
        sat: false,
        sun: false
    };

    public nonWorkingDays = '';

    public model: {workingDays: {}, nonWorkingDays: string} = {
        workingDays: this.workingDays,
        nonWorkingDays: this.nonWorkingDays
    };

    checkModel() {
        console.log(this.model);
    }
}