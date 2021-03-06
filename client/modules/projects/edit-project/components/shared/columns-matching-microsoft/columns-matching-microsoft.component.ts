import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {MsSyncClientService} from 'client/service/microservices/ms-sync-client.service';
import {AuthService} from 'client/service/auth.service';
import {ProcoreTodoColumn, MicrosoftProjectColumn} from 'client/entities/entities';

@Component({
    selector: 'columns-matching-microsoft',
    templateUrl: 'client/modules/projects/edit-project/components/shared/columns-matching-microsoft/columns-matching-microsoft.component.html',
    styleUrls: ['client/modules/projects/edit-project/components/shared/columns-matching-microsoft/columns-matching-microsoft.component.css']
})
export class ColumnsMatchingMicrosoftComponent implements OnInit {

    constructor(protected MsProjectClientService: MsProjectClientService,
                protected MsSyncClientService: MsSyncClientService,
                protected AuthService: AuthService) {
    }

    ngOnInit() {
        return Promise.all([
            this.MsProjectClientService.getMicrosoftProjectColumns(),
            this.MsSyncClientService.getProcoreTodosColumns(this.pipeType)
        ])
            .then(resultsList => {
                let mcColumns = resultsList[0];
                let prColumns = resultsList[1];

                this.mcColumns = mcColumns;
                this.prColumns = prColumns;

                this.prColumns.forEach(prColumn => {
                    this.model[prColumn.slug] = this.prefillDropdownValue(prColumn) || '';
                });
            });
    }

    prefillDropdownValue(prColumn) {
        let prefilledId = null;

        this.mcColumns.forEach(mcColumns => {
            if (!this.isNotAvailable(mcColumns, prColumn)) {
                if (Array.isArray(prColumn.title)) {
                    if (prColumn.title.indexOf(mcColumns.title) !== -1) {
                        prefilledId = mcColumns.value;

                        return false;
                    }
                } else {
                    if (prColumn.title === mcColumns.title) {
                        prefilledId = mcColumns.value;

                        return false;
                    }
                }
            }
        });

        return prefilledId;
    }

    isNotAvailable(mcColumn, prColumn): boolean {
        let notAvailable = false;

        for (let prop in this.model) {
            if (this.model.hasOwnProperty(prop)) {
                // if not in current dropdown
                if (prop !== prColumn.slug && Number(this.model[prop]) === Number(mcColumn.id)) {
                    notAvailable = true;
                }

                if (Array.isArray(prColumn.type) && prColumn.type.indexOf(mcColumn.type) === -1) {
                    // if type is array and value is not allowed
                    notAvailable = true;
                }

                if (!Array.isArray(prColumn.type) && mcColumn.type !== prColumn.type) {
                    // if type is not allowed
                    notAvailable = true;
                }
            }
        }

        return notAvailable;
    }

    getAvailableOptions(prColumn) {
        return this.mcColumns.filter(mcColumns => {
            return !this.isNotAvailable(mcColumns, prColumn);
        });
    }

    @Input('sheet-id') smartsheetSheetId: number;
    @Input('pipe-type') pipeType: string;

    protected mcColumns: MicrosoftProjectColumn[];
    protected prColumns: ProcoreTodoColumn[];

    protected validationError: boolean = false;

    protected buttonSubmitted: boolean = false;

    public model: {} = {};

    @Output() columnsMatched = new EventEmitter();

    matchColumns() {
        // this.validationError = false;
        //
        // let notRequiredColumnsList = [
        //     'assigned_to',
        //     'description',
        //     'resource',
        // ];
        //
        // for (let columnConst in this.model) {
        //     if (this.model.hasOwnProperty(columnConst)) {
        //         if (notRequiredColumnsList.indexOf(columnConst) === -1 && !this.model[columnConst]) {
        //             this.validationError = true;
        //
        //             return false;
        //         }
        //     }
        // }
        //
        // this.buttonSubmitted = true;

        this.columnsMatched.emit({});
    }
}
