import {Component, OnInit, Input, Output, EventEmitter} from "@angular/core";
import {PipeConnectionService} from 'client/service/pipe-connection.service';
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {AuthService} from 'client/service/auth.service';
import {NotificationsService} from "client/modules/notifications/notifications.service";

@Component({
    selector: 'smartsheet-schedule-choose',
    templateUrl: 'client/modules/projects/edit-project/components/shared/smartsheet-schedule-choose/smartsheet-schedule-choose.component.html',
    styleUrls: [
        // 'client/modules/projects/edit-project/components/shared/smartsheet-schedule-choose/smartsheet-schedule-choose.component.css'
    ],
})
export class SmartsheetScheduleChooseComponent implements OnInit {

    constructor(protected PipeConnectionService: PipeConnectionService,
                protected MsProjectClientService: MsProjectClientService,
                protected NotificationsService: NotificationsService,
                protected AuthService: AuthService) {
    }

    ngOnInit() {
    }

    makeDecision(result) {
        return this.decisionMade.emit(result);
    }

    protected useScheduleGantt() {
        if (this.componentIsBusy) {
            return;
        }

        this.componentIsBusy = true;

        return this.PipeConnectionService.createNewOrGetExistingPipe(this.pipeType, true)
            .then(() => {
                return this.PipeConnectionService.refreshPipesList();
            })
            .then(() => {
                return this.makeDecision('gantt_chart');
            });
    }

    protected doNotUseScheduleGantt() {
        if (this.componentIsBusy) {
            return;
        }

        if (!this.AuthService.authUser.smartsheet_oauth) {
            this.NotificationsService.addReaction('Error. You don`t have Smartsheet credentials connected. Please connect your account.',
                'error',
                'Smartsheet connection required',
                [
                    {label: 'Connect Smartsheet', route: ['/', 'connection']},
                    {label: 'Cancel', route: ['/']},
                ]);

            return;
        }

        return this.makeDecision('smartsheet');
    }

    protected componentIsBusy: boolean = false;

    @Input('pipe-type') pipeType: string;
    @Input('text') text: string;

    @Output() decisionMade = new EventEmitter();
}
