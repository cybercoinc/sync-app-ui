import {Component, OnInit} from "@angular/core";
import {Router, ActivatedRoute} from '@angular/router';

import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {AuthService} from 'client/service/auth.service';

@Component({
    selector: "delete-project",
    templateUrl: 'client/modules/projects/delete-project/delete-project.component.html'
})
export class DeleteProjectComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                protected ActivatedRoute: ActivatedRoute,
                private router: Router) {
    }

    ngOnInit() {
        this.ActivatedRoute.params.forEach((params) => {
            this.projectId = +params['project_id'];
        });

    }

    protected projectId: number;

    deleteProject() {
        this.MsProjectClientService.deleteProject(this.projectId, this.AuthService.authUser.auth_session_id)
            .then(() => {
                return this.router.navigate(['projects']);
            })
    }
}