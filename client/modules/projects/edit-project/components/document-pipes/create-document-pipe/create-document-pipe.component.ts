import { Component, OnInit, Input } from '@angular/core';

import { PipeConnectionService } from 'client/service/pipe-connection.service';

@Component({
    selector: 'create-document-pipe',
    templateUrl: 'client/modules/projects/edit-project/components/document-pipes/create-document-pipe/create-document-pipe.component.html'
})
export class CreateDocumentPipeComponent implements OnInit {
    constructor(protected pipeConnectionService: PipeConnectionService) {
    }

    ngOnInit() {

    }

}
