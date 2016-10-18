import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';
import {AuthService} from 'client/service/auth.service';
import {WizardComponentInterface} from 'client/intefraces/wizard-component.interface';
import {ProcoreTodoColumn, SmartsheetSheetColumn} from 'client/entities/entities';

@Component({
    moduleId: module.id,
    selector: 'columns-matching',
    templateUrl: 'columns-matching.component.html',
    styleUrls: ['columns-matching.component.css']
})
export class ColumnsMatchingComponent implements OnInit, WizardComponentInterface {

    constructor(protected MsProjectClientService: MsProjectClientService,
                protected MsSyncClientService: MsSyncClientService,
                protected AuthService: AuthService) {
    }

    ngOnInit() {
        this.MsProjectClientService.getSmartsheetSheetColumns(this.AuthService.authUser.id, this.smartsheetSheetId,
            this.AuthService.authUser.auth_session_id)
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

    performAction() {
        // todo submit this.model to service
        console.log('action performed');
    }

    @Input('sheet-id') smartsheetSheetId: number;

    protected sheetColumns: [SmartsheetSheetColumn];
    protected procoreTodosColumns: [ProcoreTodoColumn];

    public model: {} = {};
}