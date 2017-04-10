import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {PipeConnectionService} from "client/service/pipe-connection.service";
import {NotificationPolicy} from "client/entities/entities";
import {Router, ActivatedRoute, Params} from "@angular/router";

@Component({
    selector: 'policy',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/task-notifications/policy/policy.component.html',
    styleUrls: ['client/modules/projects/edit-project/components/project-settings/task-notifications/policy/policy.component.css'],
})
export class PolicyComponent implements OnInit {
    private types = [
        'due',
        'upcoming',
        'completed',
        'active',
    ];
    private periods = [
        '1 day',
        '1 week',
        '2 weeks',
        '4 weeks',
    ];
    private schedules = [
        'daily',
        'separator',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
        'separator',
        'every 1st day of month',
        'every 15th day of month',
        'every last day of month',
    ];
    private times = [
        '01:00 am', '02:00 am', '03:00 am', '04:00 am', '05:00 am', '06:00 am', '07:00 am', '08:00 am', '09:00 am', '10:00 am', '11:00 am', '12:00 am',
        '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm', '06:00 pm', '07:00 pm', '08:00 pm', '09:00 pm', '10:00 pm', '11:00 pm', '12:00 pm',
    ];

    public policy: NotificationPolicy;
    private isShowCustomEmails: boolean = false;

    constructor(protected msProjectClient: MsProjectClientService,
                protected pipeConnectionService: PipeConnectionService,
                protected activatedRoute: ActivatedRoute,
                protected router: Router) {}

    ngOnInit(): void {
        this.activatedRoute.params.subscribe((params: Params) => {
            let policyId = params['policy_id'];

            if (policyId) {
                this.msProjectClient.getNotificationPolicy({id: policyId})
                    .then(policy => {
                        this.policy = policy[0];
                        this.isShowCustomEmails = this.policy.params.custom_emails != null;
                    });
            }
            else {
                this.policy = new NotificationPolicy();
            }
        });
    }

    goBack() {
        return this.router.navigate(['projects', this.pipeConnectionService.project.id, 'edit-project', 'settings']);
    }

    save() {
        // if policy already exist
        if (this.policy.id) {
            this.msProjectClient.updateNotificationPolicy(this.policy.id, this.policy);
        }
        else {
            this.msProjectClient.createNotificationPolicy({
                name: this.policy.name,
                params: this.policy.params,
                type: this.policy.type,
                time: this.policy.time,
                schedule: this.policy.schedule,
                project_fk_id: this.pipeConnectionService.project.id,
                is_enabled: true,
            });
        }

        return this.goBack();
    }
}
