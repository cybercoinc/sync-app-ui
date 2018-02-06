import { Component, Input, OnInit } from '@angular/core';
import { MsProjectClientService } from '../../../../../../service/microservices/ms-project-client.service';
import { FoldersPickerService } from './folders-picker.service';

export interface ProcoreFolder {
    id: number;
    name: string;
    parent_id: number;
    private: boolean;
    updated_at: string;
    is_tracked: boolean;
    name_with_path: string;
    folders: ProcoreFolder[];
    files: any[];
    has_children: boolean;
    read_only: boolean;
    is_deleted: boolean;
    is_recycle_bin: boolean;
}

@Component({
    selector: 'procore-folders-picker',
    templateUrl: 'client/modules/projects/edit-project/components/document-pipes/procore-folders-picker/procore-folders-picker.component.html',
    styleUrls: ['client/modules/projects/edit-project/components/document-pipes/procore-folders-picker/procore-folders-picker.component.css']
})
export class ProcoreFoldersPickerComponent implements OnInit {
    @Input() projectId: number;

    folders: ProcoreFolder[] = [];

    constructor(protected projectsService: MsProjectClientService, protected foldersPickerService: FoldersPickerService) {
    }

    ngOnInit() {
        return this.projectsService.getProcoreProjectFolders(this.projectId)
            .then(projectRootStructure => this.folders = projectRootStructure.folders);
    }
}