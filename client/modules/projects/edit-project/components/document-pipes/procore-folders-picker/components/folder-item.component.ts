import { Component, Input, OnInit } from '@angular/core';
import { ProcoreFolder } from '../procore-folders-picker.component';
import { MsProjectClientService } from '../../../../../../../service/microservices/ms-project-client.service';
import { FoldersPickerService } from '../folders-picker.service';

@Component({
    selector: 'procore-folder-item',
    templateUrl: 'client/modules/projects/edit-project/components/document-pipes/procore-folders-picker/components/folder-item.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/document-pipes/procore-folders-picker/procore-folders-picker.component.css',
        'client/modules/projects/edit-project/components/document-pipes/procore-folders-picker/components/folder-item.component.css'
    ]
})
export class FolderItemComponent implements OnInit {
    @Input() folder: ProcoreFolder;

    @Input() projectId: number;

    protected isOpened: boolean = false;

    @Input() selected: ProcoreFolder;

    constructor(protected projectsService: MsProjectClientService, protected foldersPickerService: FoldersPickerService) {
    }

    ngOnInit() {
    }

    toggle() {
        this.folder.folders = [];

        this.isOpened = !this.isOpened;

        if (this.isOpened) {
            return this.projectsService.getProcoreProjectFolder(
                this.folder.id, this.projectId
            )
                .then(folderStructure => {
                    this.folder.folders = folderStructure.folders;
                });
        }
    }

    select() {
        this.foldersPickerService.selectedFolder = this.folder;
    }

}