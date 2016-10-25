import {Component, OnInit, Input} from "@angular/core";
import {PipeConnectionService} from 'client/service/pipe-connection.service';
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {AuthService} from 'client/service/auth.service';
import {ProjectPipe} from 'client/entities/entities';

@Component({
    selector: 'pipe-public-todo',
    templateUrl: 'client/modules/projects/edit-project/components/pipe-public-todo/pipe-public-todo.component.html',
    styleUrls: ['client/modules/projects/edit-project/edit-project.component.css'],
})
export class PipePublicTodoComponent implements OnInit {

    constructor(protected PipeConnectionService: PipeConnectionService,
                protected MsProjectClientService: MsProjectClientService,
                protected AuthService: AuthService) {

    }

    ngOnInit() {
        this.pipeObj = this.PipeConnectionService.pipesListObj['public_todos'];

        if (this.pipeObj) {
            if (this.pipeObj.sm_sheet_id) {
                this.smConnectionStepCompleted = true;
            }

            if (this.pipeObj.sm_working_days && this.pipeObj.sm_weekends) {
                this.smConnectionStepCompleted = true;
            }
        }
    }

    protected pipeObj: ProjectPipe;

    protected smConnectionStepCompleted: boolean = false;
    protected settingsStepCompleted: boolean = false;
}
