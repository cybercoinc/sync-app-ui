import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from 'client/service/auth.service';
import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: "choose-smartsheet-sheet",
    templateUrl: `client/modules/projects/project-wizard/choose-smartsheet-project/choose-smartsheet-sheet.component.html`,
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
export class ChooseSmartsheetSheetComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                private route: ActivatedRoute,
                private router: Router) {

    }

    ngOnInit() {
        this.getSmartsheetSheets()
            .then(smartsheetSheets => this.smartsheetSheets = smartsheetSheets);

        this.route.params.forEach((params: Params) => {
            let id = +params['id'];

            this.MsProjectClientService.getProjectByid(id, this.AuthService.authUser.auth_session_id)
                .then(projects => this.project = projects.shift());
        });
    }

    project: {name: string, id: number} | null = null;

    smartsheetSheets: [{}]|null = null;
    filterTimeout;

    filterProjects(name: string) {
        if (this.filterTimeout) {
            window.clearTimeout(this.filterTimeout);
        }

        const _self = this;

        _self.filterTimeout = setTimeout(function () {
            _self.smartsheetSheets = null;

            _self.getSmartsheetSheets()
                .then(function (smartsheetProjectsList) {
                    _self.smartsheetSheets = smartsheetProjectsList.filter(function (project) {
                        return project['name'].toLowerCase().indexOf(name.toLowerCase()) !== -1;
                    });

                    return _self.smartsheetSheets;
                });
        }, 500);
    }

    getSmartsheetSheets() {
        return this.MsProjectClientService
            .getSmartsheetProjects(this.AuthService.authUser.id, this.AuthService.authUser.auth_session_id);
    }

    chooseExistingSheet(project) {
        // todo implement
    }

    createNewSheetWithWorkspace() {
        let procoreProjectName = this.project.name;
        let workspaceName = procoreProjectName.length > 30 ? procoreProjectName.slice(0, 30) : procoreProjectName;
        let newSheetName = workspaceName + ' Procore Sync';

        return this.MsProjectClientService.createSmartsheetWorkspace({
            workspaceName: workspaceName,
            projectId: this.project.id
        }, this.AuthService.authUser.auth_session_id)
            .then(result => {
                const workspaceId = result.id;

                return this.MsProjectClientService.createSmartsheetSheetFromTemplate({
                    workspaceId: workspaceId,
                    projectId: this.project.id,
                    sheetName: newSheetName
                }, this.AuthService.authUser.auth_session_id)
            })
            .then(result => {
                console.log(result);
            })

    }

    goToNextStep() {
        // let promise = this.MsProjectClientService.createProject({
        //     name: this.selectedProject.name,
        //     status: this.selectedProject.active ? 'active' : 'inactive',
        //     procore_company_id: this.selectedProject.company.id,
        //     procore_id: this.selectedProject.id,
        //     user_fk_id: this.AuthService.authUser.id
        // }, this.AuthService.authUser.auth_session_id);
        //
        // promise.then(projectId => this.router.navigate(['projects/wizard/choose-smartsheet-sheet', projectId]));
    }
}
