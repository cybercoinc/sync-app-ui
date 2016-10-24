import {Component, OnInit} from "@angular/core";

import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {AuthService} from 'client/service/auth.service';

@Component({
    // moduleId: module.id,
    selector: "edit-project",
    templateUrl: 'client/modules/projects/edit-project/edit-project.component.html',
    styleUrls: ['client/modules/projects/edit-project/edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
    ngOnInit() {

    }

    constructor(protected AuthService: AuthService,
                protected MsProjectClientService: MsProjectClientService) {

    }
}