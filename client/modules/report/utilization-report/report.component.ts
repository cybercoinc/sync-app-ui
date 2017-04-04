import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {AuthService} from "client/service/auth.service";
import {MsUserClientService} from "client/service/microservices/ms-user-client.service";
import 'rxjs/add/operator/startWith';
import {Router} from '@angular/router';

import {Project, Assignee, Resource} from 'client/entities/entities';

@Component({
    selector: "utilization-report",
    templateUrl: 'client/modules/report/utilization-report/report.component.html',
    styleUrls: ['client/modules/report/utilization-report/report.component.css'],
})
export class UtilizationReportComponent implements OnInit {
    constructor(protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService,
                protected MsUserClientService: MsUserClientService,
                protected router: Router) {

    }

    public projectToGetData = [];
    public projectCount = 0;
    public peopleCount = 0;
    public resourceCount = 0;
    public showAssigneesAndResources = false;
    public showGroupBy = false;
    public showProjects = false;
    public showPeople = false;
    public showResources = false;
    public showGroupByData = false;
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

    projectRows: [Project] | any;
    filteredProjectRows: [Project] | any;

    peopleRows: [Assignee] | any;
    filteredPeopleRows: [Assignee] | any;

    resourceRows: [Resource] | any;
    filteredResourceRows: [Resource] | any;

    ngOnInit() {
        this.getProjects();
    }

    getProjects(): void {
        this.MsProjectClientService.getActiveProjects(this.AuthService.authUser.id, this.AuthService.company.id)
            .then(allProjects => {

                if (allProjects.length === 0) {
                    return [];
                }

                this.projectRows = [];
                this.filteredProjectRows = [];

                allProjects.forEach(project => {
                    this.projectRows.push(project);
                });

                return this.projectRows;
            })
    }

    showProjectsInfo() {
        this.showProjects ? this.showProjects = false : this.showProjects = true;
    }

    showPeopleInfo() {
        this.showPeople ? this.showPeople = false : this.showPeople = true;
    }

    showResourcesInfo() {
        this.showResources ? this.showResources = false : this.showResources = true;
    }

    showGroupByInfo() {
        this.showGroupByData ? this.showGroupByData = false : this.showGroupByData = true;
    }

    showGroupBySection() {
        this.filteredPeopleRows = [];
        for (let email in this.model.assignees) {
            if (this.model.assignees.hasOwnProperty(email)) {
                if (this.model.assignees[email]) {
                    this.peopleRows.forEach(peopleRow => {
                        if (peopleRow.email === email) {
                            this.filteredPeopleRows.push(peopleRow);
                        }
                    });
                }
            }
        }

        this.filteredResourceRows = [];
        for (let resourceName in this.model.resources) {
            if (this.model.resources.hasOwnProperty(resourceName)) {
                if (this.model.resources[resourceName]) {
                    this.resourceRows.forEach(resourceRow => {
                        if (resourceRow.name === resourceName) {
                            this.filteredResourceRows.push(resourceRow);
                        }
                    });
                }
            }
        }

        this.showGroupBy ? this.showGroupBy = false : this.showGroupBy = true;
    }

    protected filterProjectTimeout;

    filterProjects(name: string): void {
        if (this.filterProjectTimeout) {
            window.clearTimeout(this.filterProjectTimeout);
        }

        this.filterProjectTimeout = setTimeout(e => {
            if (name.length === 0) {
                return this.filteredProjectRows = []
            }

            this.filteredProjectRows = null;
            // to filter from backend
            this.filteredProjectRows = this.projectRows.filter(projectRow => {
                return projectRow.name.toLowerCase().indexOf(name.toLowerCase()) !== -1;
            });
        }, 500);
    }

    protected filterPeopleTimeout;

    filterPeople(name: string): void {
        if (this.filterPeopleTimeout) {
            window.clearTimeout(this.filterPeopleTimeout);
        }

        this.filterPeopleTimeout = setTimeout(e => {
            if (name.length === 0) {
                return this.filteredPeopleRows = []
            }

            this.filteredPeopleRows = null;
            // to filter from backend
            this.filteredPeopleRows = this.peopleRows.filter(personRow => {
                let personName = personRow.first_name + ' ' + personRow.last_name;
                return personName.toLowerCase().indexOf(name.toLowerCase()) !== -1 && name !== ' ';
            });
        }, 500);
    }

    protected filterResourceTimeout;

    filterResources(name: string): void {
        if (this.filterResourceTimeout) {
            window.clearTimeout(this.filterResourceTimeout);
        }

        this.filterResourceTimeout = setTimeout(e => {
            if (name.length === 0) {
                return this.filteredResourceRows = []
            }

            this.filteredResourceRows = null;
            // to filter from backend
            this.filteredResourceRows = this.resourceRows.filter(resourceRow => {
                return resourceRow.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 && name !== ' ';
            });
        }, 500);
    }

    showAllProjects() {
        this.filteredProjectRows = this.projectRows;
    }

    showAllPeople() {
        this.filteredPeopleRows = this.peopleRows;
    }

    showAllResources() {
        this.filteredResourceRows = this.resourceRows;
    }

    getProjectCount() {
        this.projectCount = 0;
        for (let projectId in this.model.projects) {
            if (this.model.projects.hasOwnProperty(projectId)) {
                if (this.model.projects[projectId]) {
                    this.projectCount++;
                }
            }
        }

    }

    getPeopleCount() {
        this.peopleCount = 0;
        for (let email in this.model.assignees) {
            if (this.model.assignees.hasOwnProperty(email)) {
                if (this.model.assignees[email]) {
                    this.peopleCount++;
                }
            }
        }

    }

    getResourceCount() {
        this.resourceCount = 0;
        for (let resourceName in this.model.resources) {
            if (this.model.resources.hasOwnProperty(resourceName)) {
                if (this.model.resources[resourceName]) {
                    this.resourceCount++;
                }
            }
        }

    }

    showSelectedProjects() {
        this.filteredProjectRows = [];
        for (let projectId in this.model.projects) {
            if (!this.model.projects.hasOwnProperty(projectId)) {
                return;
            }
            if (!this.model.projects[projectId]) {
                return;
            }

            this.projectRows.forEach(projectRow => {
                if (Number(projectRow.id) === Number(projectId)) {
                    this.filteredProjectRows.push(projectRow);
                }
            });
        }
    }

    showSelectedPeople() {
        this.filteredPeopleRows = [];
        for (let email in this.model.assignees) {
            if (!this.model.assignees.hasOwnProperty(email)) {
                return;
            }
            if (!this.model.assignees[email]) {
                return;
            }

            this.peopleRows.forEach(peopleRow => {
                if (peopleRow.email === email) {
                    this.filteredPeopleRows.push(peopleRow);
                }
            });
        }
    }

    showSelectedResources() {
        this.filteredResourceRows = [];
        for (let name in this.model.resources) {
            if (!this.model.resources.hasOwnProperty(name)) {
                return;
            }
            if (!this.model.resources[name]) {
                return;
            }

            this.resourceRows.forEach(resourceRow => {
                if (resourceRow.name === name) {
                    this.filteredResourceRows.push(resourceRow);
                }
            });
        }
    }

    getAssignees() {
        this.MsProjectClientService.getAssigneesForProjects(this.projectToGetData)
            .then(assigneesList => {

                if (assigneesList.length === 0) {
                    return [];
                }

                this.peopleRows = [];
                this.filteredPeopleRows = [];

                assigneesList.forEach(project => {
                    this.peopleRows.push(project);
                });

                return this.peopleRows;
            });
    }

    getResources() {
        this.MsProjectClientService.getResourcesForProjects(this.projectToGetData)
            .then(resourcesList => {

                if (resourcesList.length === 0) {
                    return [];
                }

                this.resourceRows = [];
                this.filteredResourceRows = [];

                resourcesList.forEach(resource => {
                    this.resourceRows.push(resource);
                });

                return this.resourceRows;
            });
    }

    chooseProjects() {
        this.filteredProjectRows = [];
        for (let projectId in this.model.projects) {
            if (this.model.projects.hasOwnProperty(projectId)) {
                if (this.projectToGetData.indexOf(projectId) === -1) {
                    if (this.model.projects[projectId]) {
                        this.projectToGetData.push(projectId);
                        this.projectRows.forEach(projectRow => {
                            if (Number(projectRow.id) === Number(projectId)) {
                                this.filteredProjectRows.push(projectRow);
                            }
                        });
                    }
                }
            }
        }

        if (this.projectToGetData.length === 0) {
            return;
        }

        return Promise.all([
            this.getAssignees(),
            this.getResources()
        ])
            .then(() => {
                this.showAssigneesAndResources = true;
            });
    }

    backToProjects() {
        this.showAssigneesAndResources = false;
        this.showGroupBy = false;
        this.model.assignees = [];
        this.model.resources = [];
        this.projectToGetData = [];
        this.peopleCount = 0;
        this.resourceCount = 0;
    }

    backToPeople() {
        this.showAssigneesAndResources = true;
        this.showGroupBy = false;
        this.showPeople = true;
        this.showSelectedPeople();
    }

    backToResources() {
        this.showAssigneesAndResources = true;
        this.showGroupBy = false;
        this.showResources = true;
        this.showSelectedResources();
    }

    save() {
        let dataToSet = {};
        for (let modelProperty in this.model) {
            if (this.model.hasOwnProperty(modelProperty)) {
                if (modelProperty === 'group_by') {
                    dataToSet[modelProperty] = this.model[modelProperty];
                    continue;
                }
                if (!dataToSet[modelProperty]) {
                    dataToSet[modelProperty] = [];
                }
                for (let checkedKey in this.model[modelProperty]) {
                    if (this.model[modelProperty].hasOwnProperty(checkedKey)) {
                        if (this.model[modelProperty][checkedKey]) {
                            dataToSet[modelProperty].push(checkedKey);
                        }
                    }
                }
            }
        }

        this.MsProjectClientService.setReportData(dataToSet)
            .then(result => {
                return this.router.navigate(['/utilization-report/' + result.shift()]);
            });

    }
}