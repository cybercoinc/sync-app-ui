import {Component, Input, OnInit} from "@angular/core";
import {MsProjectClientService} from "client/service/microservices/ms-project-client.service";
import {Project} from "client/entities/entities";

@Component({
    selector: 'chart-working-days',
    templateUrl: 'client/modules/projects/edit-project/components/project-settings/chart-working-days/chart-working-days.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/project-settings/chart-working-days/chart-working-days.component.css'
    ],
})
export class ChartWorkingDaysComponent implements OnInit {
    @Input() projectId;

    private holidays    = '';
    private workingDays = [];
    private weekDays    = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    constructor(private msProjectClient: MsProjectClientService) {}

    ngOnInit(): void {
        this.msProjectClient.getProjectByid(this.projectId)
            .then((response: Project[]) => {
                let project = response.shift();

                if (project.holidays) {
                    this.holidays = project.holidays.join(',');
                }

                this.workingDays = project.working_days;
            });
    }

    selectDay(e, day) {
        if (e.checked) {
            this.workingDays.push(day);
        }
        else {
            let index = this.workingDays.indexOf(day);
            if (index > -1) {
                this.workingDays.splice(index, 1);
            }
        }
    }

    save() {
        this.msProjectClient.update(this.projectId, {
            working_days: this.workingDays,
            holidays:     this.holidays ? this.holidays.split(',') : '',
        });
    }
}
