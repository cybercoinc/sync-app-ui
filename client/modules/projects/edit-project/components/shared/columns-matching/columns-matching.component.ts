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
    @Input('sheet-id') smartsheetSheetId: number;
    @Input('pipe-type') pipeType: string;
    @Input('saved-sheet-columns') savedSheetColumns: any = null;

    protected smColumns: SmartsheetSheetColumn[];
    protected prColumns: ProcoreTodoColumn[];

    protected validationError: boolean = false;

    protected buttonSubmitted: boolean = false;
    protected fetchColumnsSubmitted: boolean = false;

    public model: {} = {};

    @Output() columnsMatched = new EventEmitter();

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
                let prColumns = resultsList[1].filter(item => {
                    if (this.pipeType === 'tasks') {
                        return item.slug !== 'assigned_to'
                    }
                    return true;
                });

                this.smColumns = smColumns;
                this.prColumns = this.prepareAvailableProperties(prColumns, smColumns);

                this.prColumns.forEach(prColumn => {
                    if (this.savedSheetColumns) {
                        this.model[prColumn.slug] = this.savedSheetColumns[prColumn.slug] || '';
                    } else {
                        this.model[prColumn.slug] = this.prefillDropdownValue(prColumn) || '';
                    }

                });
            });
    }

    prepareAvailableProperties(prColumns, smColumns) {
        return prColumns.map(prColumn => {
            const prType = Array.isArray(prColumn.type) ? prColumn.type : [prColumn.type];
            let availableOptions = smColumns.filter(smColumn => {
                return prType.includes(smColumn.type);
            });

            availableOptions = availableOptions.map(option => {
                // Do not allow pick column "Assigned To" from smartsheet to use in Tasks sync.
                // Because for tasks we do not sync assignee at all, and instead sync Resources. And we auto-populate
                // this column in smartsheet. Which is not desired for column "Assigned To".
                if (this.pipeType === 'tasks' && option.title === 'Assigned To') {
                    option.isDisabled = true;
                } else {
                    option.isDisabled = false;
                }
                return option;
            });

            return Object.assign({}, prColumn, {options: availableOptions});
        })
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
                if (prop !== prColumn.slug && Number(this.model[prop]) === Number(smColumn.id) && (prColumn.type !== 'ABSTRACT_DATETIME' && prColumn.type !== 'DATE')) {
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

    // getAvailableOptions(prColumn) {
    //     return this.smColumns.filter(smColumn => {
    //         return !this.isNotAvailable(smColumn, prColumn);
    //     });
    // }

    matchColumns() {
        this.validationError = false;

        let notRequiredColumnsList = [
            'actual_start',
            'actual_finish',
            'baseline_start',
            'baseline_finish',
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

    fetchColumnsFromSmartsheet() {
        this.fetchColumnsSubmitted = true;
        this.MsProjectClientService.getSmartsheetSheetColumns(this.smartsheetSheetId)
            .then((smColumns) => {
                this.fetchColumnsSubmitted = false;
                this.smColumns = smColumns;
                this.prColumns = this.prepareAvailableProperties(this.prColumns, smColumns);
            })
            .catch(() => {
                this.fetchColumnsSubmitted = false;
            })

    }
}
