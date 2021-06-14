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

    public resources = [];

    public model: {} = {};

    @Input('projectId') projectId: number;

    ngOnInit() {
        return this.getResources();
    }

    addResource() {
        let dialogRef = this.MdDialog.open(AddResourceDialog, {
            data: {
                projectId: this.projectId
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result && result.resource !== '') {
                if (this.resources.indexOf(result.resource) === -1) {
                    this.resources.push(result.resource);
                }
            }
        });
    }

    getResources() {
        return this.MsProjectClientService.getResources(this.projectId)
            .then(results => {
                let resourcesList = results;

                resourcesList.forEach(resource => {
                    this.existingResourcesObj[resource.id] = resource.name;

                    if (this.resources.indexOf(resource.name) === -1) {
                        this.resources.push(resource.name);
                    }
                });
            })
    }
}
