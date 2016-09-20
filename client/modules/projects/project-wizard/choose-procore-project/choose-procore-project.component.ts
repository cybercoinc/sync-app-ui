import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';

@Component({
    selector: "choose-procore-project",
    templateUrl: `client/modules/projects/project-wizard/choose-procore-project/choose-procore-project.component.html`,
    styles: [`
            .projects-list {
                height: 250px;
                width: 500px;
                overflow-x: auto;
                padding-top: 20px;
            }

            md-radio-button {
                margin-left: 20px;
            }
        `]
})
export class ChooseProcoreProjectComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService, protected AuthService: AuthService) {
    }

    ngOnInit() {
        this.getProcoreProjects()
            .then(procoreProjects => this.procoreProjects = procoreProjects);
    }

    @Output() stepResult: EventEmitter<{}> = new EventEmitter<{}>();

    procoreProjects: [{}]|null = null;

    filterTimeout;

    filterProjects(name: string) {
        if (this.filterTimeout) {
            window.clearTimeout(this.filterTimeout);
        }

        const _self = this;

        _self.filterTimeout = setTimeout(function () {
            _self.procoreProjects = null;

            _self.getProcoreProjects()
                .then(function (procoreProjects) {
                    _self.procoreProjects = procoreProjects.filter(function (project) {
                        return project['name'].toLowerCase().indexOf(name.toLowerCase()) !== -1;
                    });

                    return _self.procoreProjects;
                });
        }, 500);
    }

    getProcoreProjects() {
        return this.MsProjectClientService.getProcoreProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id);
    }

    chooseProject(project) {
        this.stepResult.emit({
            name: 'CHOOSE_PROCORE_PROJECT',
            result: project
        });
    }
}
