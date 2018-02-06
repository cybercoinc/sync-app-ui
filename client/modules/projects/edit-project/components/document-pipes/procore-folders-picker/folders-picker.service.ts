import { Injectable } from '@angular/core';
import { ProcoreFolder } from './procore-folders-picker.component';

@Injectable()
export class FoldersPickerService {
    public selectedFolder: ProcoreFolder;
}
