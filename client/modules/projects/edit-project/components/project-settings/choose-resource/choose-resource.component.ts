import {Component, OnInit, Input} from "@angular/core";
import {AuthService} from "client/service/auth.service";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {MdDialog} from "@angular/material";
import {AddResourceDialog} from "./add-resource.dialog";

@Component({
    selector: 'choose-resource',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/choose-resource/choose-resource.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/project-settings/choose-resource/choose-resource.component.css'
    ],
})
export class ChooseResourceComponent implements OnInit {
    constructor(protected AuthService: AuthService,
                protected MsProjectClientService: MsProjectClientService,
                public MdDialog: MdDialog) {
    }

    public assignees = [];

    public existingResourcesObj = {};
    public tradesObj = {};

    public resourcesDropdownValues = [];

    public model: {} = {};

    protected systemConnectedAssigneesIdsList = [];

    @Input('projectId') projectId: number;

    ngOnInit() {
        return this.getResources()
            .then(() => {
                return this.MsProjectClientService.getSystemConnectedProjectAssigneesIds(this.projectId)
            })
            .then(systemConnectedAssigneesIdsList => {
                this.systemConnectedAssigneesIdsList = systemConnectedAssigneesIdsList;

                return this.getAssignees()
            });
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

    addResource() {
        let dialogRef = this.MdDialog.open(AddResourceDialog);
        dialogRef.afterClosed().subscribe(result => {
            if (result && result.resource !== "") {
                if (this.resourcesDropdownValues.indexOf(result.resource) === -1) {
                    this.resourcesDropdownValues.push(result.resource);
                }
            }

        });
    }

    getResources() {
        return Promise.all([
            this.MsProjectClientService.getResources(this.projectId),
            this.MsProjectClientService.getTrades(this.projectId)
        ])
            .then(results => {
                let resourcesList = results[0];
                let tradesList = results[1];

                resourcesList.forEach(resource => {
                    this.existingResourcesObj[resource.id] = resource.name;

                    if (this.resourcesDropdownValues.indexOf(resource.name) === -1) {
                        this.resourcesDropdownValues.push(resource.name);
                    }
                });

                tradesList.forEach(trade => {
                    this.tradesObj[trade.id] = trade.name;

                    if (this.resourcesDropdownValues.indexOf(trade.name) === -1) {
                        this.resourcesDropdownValues.push(trade.name);
                    }
                });
            })
    }

    save() {
        this.MsProjectClientService.setResourceToAssignee(this.model, this.projectId);
    }

}
