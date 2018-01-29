import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'edit-document-pipe',
    templateUrl: 'client/modules/projects/edit-project/components/document-pipes/edit-document-pipe/edit-document-pipe.component.html'
})
export class EditDocumentPipeComponent implements OnInit {
    ngOnInit() {
        console.log('edit document pipe');
    }
}