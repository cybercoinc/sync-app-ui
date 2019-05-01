import { Component, OnInit, Input } from '@angular/core';
import { PipeConnectionService } from 'client/service/pipe-connection.service';
import { MsLicenseClientService } from 'client/service/microservices/ms-license-client.service';
import { AuthService } from 'client/service/auth.service';

@Component({
    selector: 'status-row',
    templateUrl: 'client/modules/projects/edit-project/components/shared/status-row/status-row.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/shared/status-row/status-row.component.css',
        'client/modules/projects/edit-project/edit-project.component.css'
    ]
})
export class StatusRowComponent implements OnInit {

    public canEnablePipe = null;

    constructor(
        protected PipeConnectionService: PipeConnectionService,
        protected AuthService: AuthService,
        protected MsLicenseClientService: MsLicenseClientService
    ) {

    }

    ngOnInit() {
        this.MsLicenseClientService.getCompanyBillingStatus(this.AuthService.company.id)
            .then(response => {
                if (response.is_subscription_active
                    && this.PipeConnectionService.pipesListObj[this.pipeType]
                    &&
                    (this.PipeConnectionService.pipesListObj[this.pipeType].sm_sheet_id
                        || this.PipeConnectionService.pipesListObj[this.pipeType].use_schedule_chart
                        || this.PipeConnectionService.pipesListObj[this.pipeType].connected_to === 'microsoft-online'
                        || this.PipeConnectionService.pipesListObj[this.pipeType].connected_to === 'microsoft-desktop'
                    )
                ) {
                    this.canEnablePipe = true;
                }

            });
    }

    // canEnablePipe() {
    //     let can = false;
    //
    //     if (this.PipeConnectionService.pipesListObj[this.pipeType]
    //         &&
    //         (this.PipeConnectionService.pipesListObj[this.pipeType].sm_sheet_id
    //             || this.PipeConnectionService.pipesListObj[this.pipeType].use_schedule_chart
    //         )
    //     ) {
    //         can = true;
    //     }
    //
    //     return can;
    // }

    @Input('pipe-type') pipeType: 'public_todos' | 'private_todos' | 'tasks' | 'document_pipe';
}
