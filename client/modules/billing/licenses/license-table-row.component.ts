import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector: 'license-table-row',
    template: `
                <div class="row license-table-row bottom-lined">
                    <div class="col-xs-3">{{licenseId}}</div>
                    <div class="col-xs-3">{{licenseStatus}}</div>
                    <div class="col-xs-3">{{licenseType}}</div>
                    <div class="col-xs-3">{{licenseExpDate}}</div>
                </div>
             `,
    styleUrls: ['client/modules/billing/licenses/licenses-table.component.css'],
})
export class LicenseTableRowComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

    @Input('license-id') licenseId: string;
    @Input('license-status') licenseStatus: string;
    @Input('license-type') licenseType: string;
    @Input('license-exp-date') licenseExpDate: string;
}
