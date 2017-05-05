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
        return Promise.all([
            this.MsProjectClientService.getSmartsheetSheetColumns(this.smartsheetSheetId),
            this.MsSyncClientService.getProcoreTodosColumns(this.pipeType)
        ])
            .then(resultsList => {
                let smColumns = resultsList[0];
                let prColumns = resultsList[1];

                this.smColumns = smColumns;
                this.prColumns = prColumns;

                this.prColumns.forEach(prColumn => {
                    this.model[prColumn.slug] = this.prefillDropdownValue(prColumn) || '';
                });
            });
    }

    prefillDropdownValue(prColumn) {
        let prefilledId = null;

        this.smColumns.forEach(smColumn => {
            if (!this.isNotAvailable(smColumn, prColumn)) {
                if (Array.isArray(prColumn.title)) {
                    if (prColumn.title.indexOf(smColumn.title) !== -1) {
                        prefilledId = smColumn.id;

                        return false;
                    }
                } else {
                    if (prColumn.title === smColumn.title) {
                        prefilledId = smColumn.id;

                        return false;
                    }
                }
            }
        });

        return prefilledId;
    }

    isNotAvailable(smColumn, prColumn): boolean {
        let notAvailable = false;

        for (let prop in this.model) {
            if (this.model.hasOwnProperty(prop)) {
                // if not in current dropdown
                if (prop !== prColumn.slug && Number(this.model[prop]) === Number(smColumn.id)) {
                    notAvailable = true;
                }

                if (Array.isArray(prColumn.type) && prColumn.type.indexOf(smColumn.type) === -1) {
                    // if type is array and value is not allowed
                    notAvailable = true;
                }

                if (!Array.isArray(prColumn.type) && smColumn.type !== prColumn.type) {
                    // if type is not allowed
                    notAvailable = true;
                }
            }
        }

        return notAvailable;
    }

    @Input('sheet-id') smartsheetSheetId: number;
    @Input('pipe-type') pipeType: string;

    protected smColumns: SmartsheetSheetColumn[];
    protected prColumns: ProcoreTodoColumn[];

    protected validationError: boolean = false;

    protected buttonSubmitted: boolean = false;

    public model: {} = {};

    @Output() columnsMatched = new EventEmitter();

    matchColumns() {
        this.validationError = false;

        let notRequiredColumnsList = [
            'actual_start',
            'actual_finish',
        ];

        for (let columnConst in this.model) {
            if (this.model.hasOwnProperty(columnConst)) {
                if (notRequiredColumnsList.indexOf(columnConst) === -1 && !this.model[columnConst]) {
                    this.validationError = true;

                    return false;
                }
            }
        }

        this.buttonSubmitted = true;

        this.columnsMatched.emit(this.model);
    }
}