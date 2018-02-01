import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';


@Component({
    selector: 'edit-document-pipe',
    templateUrl: 'client/modules/projects/edit-project/components/document-pipes/edit-document-pipe/edit-document-pipe.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/document-pipes/edit-document-pipe/edit-document-pipe.component.css'
    ]
})
export class EditDocumentPipeComponent implements OnInit {
    protected pipeId: number;

    ngOnInit() {

        console.log(this.pipeId);
    }

    constructor(protected activatedRoute: ActivatedRoute) {
        this.activatedRoute.params.subscribe(params => {
            this.pipeId = +params['pipe_id'];
        });
    }
}