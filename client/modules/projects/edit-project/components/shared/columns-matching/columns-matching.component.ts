import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';
import {AuthService} from 'client/service/auth.service';
import {ProcoreTodoColumn, SmartsheetSheetColumn} from 'client/entities/entities';

@Component({
    selector: 'columns-matching',
    templateUrl: 'client/modules/projects/edit-project/components/shared/columns-matching/columns-matching.component.html',
    styleUrls: ['client/modules/projects/edit-project/components/shared/columns-matching/columns-matching.component.css']
})
export class ColumnsMatchingComponent implements OnInit {

    constructor(protected MsProjectClientService: MsProjectClientService,
                protected MsSyncClientService: MsSyncClientService,
                protected AuthService: AuthService) {
    }

    ngOnInit() {
        this.MsProjectClientService.getSmartsheetSheetColumns(
            this.AuthService.authUser.id,
            this.smartsheetSheetId,
            this.AuthService.authUser.auth_session_id
        )
            .then(sheetColumns => {
                this.sheetColumns = sheetColumns
            });

        this.MsSyncClientService.getProcoreTodosColumns(this.AuthService.authUser.auth_session_id)
            .then(todosColumns => {
                this.procoreTodosColumns = todosColumns;

                this.procoreTodosColumns.forEach(todoColumn => {
                    this.model[todoColumn.slug] = '';
                });
            });
    }

    checkIfOptionDisabled(columnId, dropdownName) {
        for (let prop in this.model) {
            if (this.model.hasOwnProperty(prop)) {
                if (prop !== dropdownName && this.model[prop] === String(columnId)) {
                    return true;
                }
            }
        }

        return false;
    }

    @Input('sheet-id') smartsheetSheetId: number;

    protected sheetColumns: SmartsheetSheetColumn[];
    protected procoreTodosColumns: ProcoreTodoColumn[];

    public model: {} = {};

    @Output() columnsMatched = new EventEmitter();

    matchColumns() {
        this.columnsMatched.emit(this.model);
    }
}