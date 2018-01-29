import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'client/service/auth.service';
import { MsProjectClientService } from 'client/service/microservices/ms-project-client.service';
import { MdDialog } from '@angular/material';
import { SetGanttAccessDialog } from './dialogs/set-gantt-access.dialog';
import { PipeConnectionService } from 'client/service/pipe-connection.service';

@Component({
    selector: 'project-directory',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/project-directory/project-directory.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/project-settings/project-directory/project-directory.component.css'
    ]
})
export class ProjectDirectoryComponent implements OnInit {
    constructor(protected AuthService: AuthService,
                protected MsProjectClientService: MsProjectClientService,
                protected PipeConnectionService: PipeConnectionService,
                public MdDialog: MdDialog) {
    }

    public assignees = [];

    public existingResourcesObj = {};

    public model: {} = {};

    @Input('projectId') projectId: number;

    ngOnInit() {
        return this.getAssignees();
    }

    getAssignees() {
        this.MsProjectClientService.getAssignees(this.projectId)
            .then(assigneeList => {
                this.assignees = assigneeList;

                this.assignees.forEach(assigneeObj => {
                    this.model[assigneeObj.id] = this.existingResourcesObj[assigneeObj.resource_id] || '';
                });
            });
    }

    setGanttAccessForUser(userId) {
        if (!this.canEditGanttPermissions() || !userId) {
            return false;
        }

        let dialogRef = this.MdDialog.open(SetGanttAccessDialog);

        dialogRef.componentInstance.userId = userId;
        dialogRef.componentInstance.projectId = this.projectId;
    }

    canEditGanttPermissions(): boolean {
        return this.PipeConnectionService.project.creator__user_fk_id &&
            (this.PipeConnectionService.project.creator__user_fk_id.id === this.AuthService.authUser.id);
    }
}
