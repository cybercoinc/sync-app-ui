import {Component, OnInit} from "@angular/core";

@Component({
    selector: 'license-table-header',
    template: `
                <div class="row license-table-header bottom-lined">
                    <div class="col-xs-3">#ID</div>
                    <div class="col-xs-3">Status</div>
                    <div class="col-xs-3">Type</div>
                    <div class="col-xs-3">Exp.Date</div>
                </div>
             `,
    styleUrls: ['client/modules/billing/licenses/licenses-table.component.css'],
})
export class LicenseTableHeaderComponent implements OnInit {

    ngOnInit() {
    }

}
