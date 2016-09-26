import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Config} from 'client/config';

@Component({
    selector: "match-sheet-columns",
    templateUrl: `client/modules/projects/project-wizard/match-sheet-columns/match-sheet-columns.component.html`,
    styles: [`
            
        `]
})
export class MatchSheetColumnsComponent implements OnInit {
    ngOnInit() {
        // get project data
    }

    goToNextStep() {
        console.log('go to next step');
    }
}