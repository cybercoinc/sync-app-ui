import {Component, Input, OnInit} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {Project, SmartsheetWorkspace} from "client/entities/entities";
import {PipeConnectionService} from "client/service/pipe-connection.service";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";

@Component({
    selector: 'workspace-management',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/workspace-management/workspace-management.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/project-settings/workspace-management/workspace-management.component.css'
    ],
})
export class WorkspaceManagementComponent implements OnInit {
    constructor(protected AuthService: AuthService,
                protected pipeConnectionService: PipeConnectionService,
                protected msProjectClientService: MsProjectClientService,
                protected msUserClientService: MsUserClientService) {
    }

    ngOnInit() {
        Promise.all([
            this.msProjectClientService.getSmartsheetWorkspace(this.projectId),
            this.msProjectClientService.getPipesWhere({
                project_fk_id: this.projectId
            }),
            this.msUserClientService.getEmailByUserId(this.project.smartsheet_workspace_creator__user_fk_id.id)
        ])
            .then(results => {
                this.workspace = results[0];
                this.canDisconnectWorkspace = results[1].length === 0;
                this.workspaceCreatorEmail = results[2];
            });
    }

    @Input('project-id') projectId: number;

    protected workspace: SmartsheetWorkspace;
    protected project: Project = this.pipeConnectionService.project;
    protected workspaceCreatorEmail: string;

    disconnectWorkspace() {
        return this.msProjectClientService.disconnectWorkspace(this.projectId)
            .then(() => {
                this.project.smartsheet_workspace_id = null;
                this.workspace = null;
                this.workspaceCreatorEmail = null;
            })
    }

    canDisconnectWorkspace: boolean = false;
}
