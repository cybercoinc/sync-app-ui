import {Component, OnInit} from "@angular/core";

import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {PipeConnectionService} from 'client/service/pipe-connection.service';
import {AuthService} from 'client/service/auth.service'

@Component({
    selector: 'edit-project',
    templateUrl: 'client/modules/projects/edit-project/edit-project.component.html',
    styleUrls: ['client/modules/projects/edit-project/edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
    constructor(protected AuthService: AuthService,
                protected MsProjectClientService: MsProjectClientService,
                protected PipeConnectionService: PipeConnectionService) {
    }

    ngOnInit() {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;
        this.project = this.PipeConnectionService.project;
    }

    protected pipesListObj;
    protected project;
}