import {Component, OnInit} from "@angular/core";
import {Router} from '@angular/router';

import {ProcoreProject} from 'client/entities/entities';

import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {AuthService} from 'client/service/auth.service';

@Component({
    moduleId: module.id,
    selector: "edit-project",
    templateUrl: 'edit-project.component.html',
    styleUrls: ['edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
    ngOnInit() {

    }

    constructor(protected AuthService: AuthService,
                protected MsProjectClientService: MsProjectClientService) {

    }
}