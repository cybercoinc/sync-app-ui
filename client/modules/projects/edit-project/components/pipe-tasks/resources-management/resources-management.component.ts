import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from 'client/service/auth.service';
import { MsProjectClientService } from 'client/service/microservices/ms-project-client.service';
import { MdDialog } from '@angular/material';
import { AddResourceDialog } from './add-resource.dialog';
import { PipeConnectionService } from 'client/service/pipe-connection.service';

@Component({
    selector: 'resources-management',
    templateUrl: 'client/modules/projects/edit-project/components/pipe-tasks/resources-management/resources-management.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/pipe-tasks/resources-management/resources-management.component.css'
    ]
})
export class ResourcesManagementComponent implements OnInit {
    constructor(protected AuthService: AuthService,
                protected MsProjectClientService: MsProjectClientService,
                protected PipeConnectionService: PipeConnectionService,
                public MdDialog: MdDialog) {
    }

    public assignees = [];

    public existingResourcesObj = {};
    public tradesObj = {};

    public resourcesDropdownValues = [];

    public model: {} = {};

    @Input('projectId') projectId: number;

    ngOnInit() {
        return this.getResources()
            .then(() => {
                return this.getAssignees();
            })
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
            if (result && result.resource !== '') {
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
