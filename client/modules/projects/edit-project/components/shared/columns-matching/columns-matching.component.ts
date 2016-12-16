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
            this.AuthService.authTokenId
        )
            .then(sheetColumns => {
                this.sheetColumns = sheetColumns
            });

        this.MsSyncClientService.getProcoreTodosColumns(this.AuthService.authTokenId)
            .then(todosColumns => {
                this.procoreTodosColumns = todosColumns;

                this.procoreTodosColumns.forEach(todoColumn => {
                    this.model[todoColumn.slug] = '';
                });
            });
    }

    isNotAvailable(smColumn, prColumn): boolean {
        let notAvailable = false;

        for (let prop in this.model) {
            if (this.model.hasOwnProperty(prop)) {
                // if not in current dropdown
                if (prop !== prColumn.slug) {
                    if (this.model[prop] === String(smColumn.id)) {
                        // if already used in another dropdown
                        notAvailable = true;
                    } else if (smColumn.type !== prColumn.type) {
                        // if type is not allowed
                        notAvailable = true;
                    }
                }
            }
        }

        return notAvailable;
    }

    @Input('sheet-id') smartsheetSheetId: number;

    protected sheetColumns: SmartsheetSheetColumn[];
    protected procoreTodosColumns: ProcoreTodoColumn[];

    protected validationError: boolean = false;

    public model: {} = {};

    @Output() columnsMatched = new EventEmitter();

    matchColumns() {
        this.validationError = false;
        // check if all fields are filled

        for (let columnConst in this.model) {
            if (this.model.hasOwnProperty(columnConst)) {
                if (!this.model[columnConst]) {
                    this.validationError = true;

                    return false;
                }
            }
        }

        this.columnsMatched.emit(this.model);
    }
}