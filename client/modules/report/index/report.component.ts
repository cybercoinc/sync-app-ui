import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from "client/service/auth.service";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";
import 'rxjs/add/operator/startWith';
import {Router} from '@angular/router';

@Component({
    selector: "report",
    templateUrl: 'client/modules/report/index/report.component.html',
    styleUrls: ['client/modules/report/index/report.component.css'],
})
export class ReportComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                protected MsUserClientService: MsUserClientService,
                protected router: Router) {

    }

    public projects = [];
    public projectToGetData = [];
    public assignees = [];
    public resources = [];
    public showAssigneesAndResources = false;
    public groupings = [
        'project',
        'people',
        'resource'
    ];

    protected model: any = {
        projects: {},
        assignees: {},
        resources: {},
        group_by: 'project'
    };

    ngOnInit() {
        this.getProjects();
    }

    getProjects() {
        this.MsProjectClientService.getActiveProjects(this.AuthService.authUser.id, this.AuthService.company.id)
            .then(projects => this.projects = projects)
    }

    getAssignees() {
        this.MsProjectClientService.getAssigneesForProjects(this.projectToGetData)
            .then(assigneesList => this.assignees = assigneesList);
    }

    getResources() {
        this.MsProjectClientService.getResourcesForProjects(this.projectToGetData)
            .then(resourcesList => {
                this.resources = resourcesList
            });
    }

    chooseProjects() {
        let projects = this.model.projects;
        for (let projectId in projects) {
            if (projects.hasOwnProperty(projectId)) {
                if (this.projectToGetData.indexOf(projectId) === -1) {
                    this.projectToGetData.push(projectId);
                }
            }
        }

        if (this.projectToGetData.length > 0) {
            return Promise.all([
                this.getAssignees(),
                this.getResources()
            ])
                .then(() => {
                    this.showAssigneesAndResources = true;
                });
        }
    }

    save() {
        let dataToSet = {};
        for(let modelProperty in this.model) {
            if(this.model.hasOwnProperty(modelProperty)) {
                if(modelProperty === 'group_by') {
                    dataToSet[modelProperty] = this.model[modelProperty];
                    continue;
                }
                if(! dataToSet[modelProperty]) {
                    dataToSet[modelProperty] = [];
                }
                for(let checkedKey in this.model[modelProperty]) {
                    if(this.model[modelProperty].hasOwnProperty(checkedKey)) {
                        dataToSet[modelProperty].push(checkedKey);
                    }
                }


            }
        }

        this.MsProjectClientService.setReportData(dataToSet)
            .then(result => {
                return this.router.navigate(['/report/' + result.shift()]);
            });

    }
}