import {Component, OnInit, Input} from "@angular/core";
import {PipeConnectionService} from 'client/service/pipe-connection.service';
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {AuthService} from 'client/service/auth.service';
import {PIPE_TYPE_PUBLIC_TODOS} from 'client/entities/entities';
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
        this.pipesListObj = this.PipeConnectionService.pipesListObj;
    }

    protected pipesListObj;
    protected pipeType = PIPE_TYPE_PUBLIC_TODOS;
}
