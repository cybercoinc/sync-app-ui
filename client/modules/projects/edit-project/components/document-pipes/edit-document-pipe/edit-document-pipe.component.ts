import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProjectPipe } from '../../../../../../entities/entities';
import { PipeConnectionService } from '../../../../../../service/pipe-connection.service';


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
    }

    constructor(protected activatedRoute: ActivatedRoute,
                protected PipeConnectionService: PipeConnectionService) {
        this.activatedRoute.params.subscribe(params => {
            this.pipeId = +params['pipe_id'];

            return this.setActivePipe();
        });
    }

    enable() {
        return this.PipeConnectionService.enablePipe(this.pipeId)
            .then(() => {
                return this.setActivePipe();
            });
    }

    disable() {
        return this.PipeConnectionService.disablePipe(this.pipeId)
            .then(() => {
                return this.setActivePipe();
            });
    }

    /**
     * @todo use ngrx
     */
    setActivePipe() {
        this.pipe = this.PipeConnectionService.docPipes.find(pipe => pipe.id === this.pipeId);
    }
}