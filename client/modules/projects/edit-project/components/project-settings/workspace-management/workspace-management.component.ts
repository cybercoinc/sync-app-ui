import {Component, Input, OnInit} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {Project, SmartsheetWorkspace} from "client/entities/entities";
import {PipeConnectionService} from "client/service/pipe-connection.service";

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
                protected msProjectClientService: MsProjectClientService) {
    }

    ngOnInit() {
        Promise.all([
            this.msProjectClientService.getSmartsheetWorkspace(this.projectId),
            this.msProjectClientService.getPipesWhere({
                project_fk_id: this.projectId
            })
        ])
            .then(results => {
                this.workspace = results[0];
                this.canDisconnectWorkspace = results[1].length === 0;
            });
    }

    @Input('project-id') projectId: number;

    protected workspace: SmartsheetWorkspace;
    protected project: Project;

    disconnectWorkspace() {
        return this.msProjectClientService.disconnectWorkspace(this.projectId)
            .then(() => {
                this.pipeConnectionService.project.smartsheet_workspace_id = null;
                this.workspace = null;
            })
    }

    canDisconnectWorkspace: boolean = false;
}
