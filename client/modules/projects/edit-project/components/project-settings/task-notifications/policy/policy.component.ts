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
        'due tasks reminder',
        'upcoming tasks reminder',
        'completed tasks reminder',
        'active tasks reminder',
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
        '1 am', '2 am', '3 am', '4 am', '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 am',
        '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm', '11 pm', '12 pm',
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
