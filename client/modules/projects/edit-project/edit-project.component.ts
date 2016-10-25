import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute, Params} from '@angular/router';

import {Project} from 'client/entities/entities';

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
                private route: ActivatedRoute,
                protected MsProjectClientService: MsProjectClientService,
                protected PipeConnectionService: PipeConnectionService) {
    }

    ngOnInit() {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;
    }

    protected pipesListObj;
}