import {Component, OnInit} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'workspace-management',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/workspace-management/workspace-management.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/project-settings/workspace-management/workspace-management.component.css'
    ],
})
export class WorkspaceManagementComponent implements OnInit {
    constructor(protected AuthService: AuthService,
                protected ActivatedRoute: ActivatedRoute) {
    }

    ngOnInit() {

    }
}
