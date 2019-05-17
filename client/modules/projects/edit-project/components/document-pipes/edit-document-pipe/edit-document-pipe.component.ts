import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { ProjectPipe } from '../../../../../../entities/entities';
import { PipeConnectionService } from '../../../../../../service/pipe-connection.service';
import {MsProjectClientService} from "../../../../../../service/microservices/ms-project-client.service";
import {NotificationsService} from "../../../../../notifications/notifications.service";


@Component({
    selector: 'edit-document-pipe',
    templateUrl: 'client/modules/projects/edit-project/components/document-pipes/edit-document-pipe/edit-document-pipe.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/document-pipes/edit-document-pipe/edit-document-pipe.component.css'
    ]
})
export class EditDocumentPipeComponent implements OnInit {
    protected pipeId: number;
    protected procorePdfSizes: Array<string> = ['LETTER', 'LEGAL', 'WIDE', 'ARCHD', 'A4', 'A3', 'A2', 'A1', 'A0'];
    protected selectedProcorePdfSize = 'LETTER';
    protected pipe: ProjectPipe;

    ngOnInit() {
    }

    constructor(protected activatedRoute: ActivatedRoute,
                protected PipeConnectionService: PipeConnectionService,
                protected MsProjectClientService: MsProjectClientService,
                protected NotificationsService: NotificationsService) {
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
     * Update pipe options
     */
    updatePipeOptions() {
        const options = {
            procore_pdf_size: this.selectedProcorePdfSize
        };

        return this.MsProjectClientService.updatePipe(this.pipeId, {
            options
        }).then(() => {
            this.NotificationsService.addInfo('Options was successfully saved');
        });
    }

    /**
     * @todo use ngrx
     */
    setActivePipe() {
        this.pipe = this.PipeConnectionService.docPipes.find(pipe => pipe.id === this.pipeId);
        this.selectedProcorePdfSize = this.pipe.options ?  this.pipe.options.procore_pdf_size : 'LETTER';
    }
}
