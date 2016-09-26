import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Config} from 'client/config';

@Component({
    selector: "set-working-week-days",
    templateUrl: `client/modules/projects/project-wizard/set-working-week-days/set-working-week-days.component.html`,
    styles: [`
            
        `]
})
export class SetWorkingWeekDaysComponent implements OnInit {
    ngOnInit() {
        // get project data
    }

    goToNextStep() {
        console.log('go to next step');
    }
}