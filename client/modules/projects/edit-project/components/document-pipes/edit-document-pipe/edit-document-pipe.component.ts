import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { MsProjectClientService } from '../../../../../../service/microservices/ms-project-client.service';
import { ProjectPipe } from '../../../../../../entities/entities';


@Component({
    selector: 'edit-document-pipe',
    templateUrl: 'client/modules/projects/edit-project/components/document-pipes/edit-document-pipe/edit-document-pipe.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/document-pipes/edit-document-pipe/edit-document-pipe.component.css'
    ]
})
export class EditDocumentPipeComponent implements OnInit {
    protected pipeId: number;

    protected pipe: ProjectPipe;

    ngOnInit() {
        return this.msProjectService.getPipeById(this.pipeId)
            .then(pipes => {
                this.pipe = pipes.shift();
            })
    }

    constructor(protected activatedRoute: ActivatedRoute,
                protected msProjectService: MsProjectClientService) {
        this.activatedRoute.params.subscribe(params => {
            this.pipeId = +params['pipe_id'];
        });
    }
}