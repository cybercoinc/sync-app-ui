import {Component, OnInit, Input} from "@angular/core";
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {AuthService} from 'client/service/auth.service';

@Component({
    moduleId: module.id,
    selector: 'columns-matching',
    templateUrl: 'columns-matching.component.html',
    styleUrls: ['columns-matching.component.css']
})
export class ColumnsMatchingComponent implements OnInit {

    constructor(protected MsProjectClientService: MsProjectClientService, protected AuthService: AuthService) {
    }

    ngOnInit() {
        console.log('columns-matching component initialised');

        this.MsProjectClientService.getSmartsheetSheetColumns(this.AuthService.authUser.id,
            this.smartsheetSheetId, this.AuthService.authUser.auth_session_id)
            .then(sheetColumns => this.sheetColumns);
    }

    @Input('sheet-id') smartsheetSheetId: number;

    protected sheetColumns;
}