import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'client/service/auth.service';
import { MsProjectClientService } from 'client/service/microservices/ms-project-client.service';
import { PipeConnectionService } from 'client/service/pipe-connection.service';

@Component({
    selector: 'people-list',
    templateUrl: 'client/modules/projects/edit-project/components/pipe-tasks/people-list/people-list.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/pipe-tasks/resources-management/resources-management.component.css'
    ]
})
export class PeopleListComponent implements OnInit {
    constructor(protected AuthService: AuthService,
                protected MsProjectClientService: MsProjectClientService,
                protected PipeConnectionService: PipeConnectionService) {
    }

    public assignees = [];

    public model: {} = {};

    @Input('projectId') projectId: number;

    ngOnInit() {
        return this.getAssignees();
    }

    getAssignees() {
        this.MsProjectClientService.getAssignees(this.projectId)
            .then(assigneeList => {
                this.assignees = assigneeList;
            });
    }
}
