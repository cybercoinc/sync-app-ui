import {Component, Input, OnInit} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {ActivatedRoute} from "@angular/router";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {SmartsheetWorkspace} from "client/entities/entities";

@Component({
    selector: 'workspace-management',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/workspace-management/workspace-management.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/project-settings/workspace-management/workspace-management.component.css'
    ],
})
export class WorkspaceManagementComponent implements OnInit {
    constructor(protected AuthService: AuthService,
                protected ActivatedRoute: ActivatedRoute,
                protected msProjectClientService: MsProjectClientService) {
    }

    ngOnInit() {
        this.msProjectClientService.getSmartsheetWorkspace(this.projectId)
            .then(workspace => {
                this.workspace = workspace;
            });
    }

    @Input('project-id') projectId: number;

    protected workspace: SmartsheetWorkspace;

}
