import {Component, OnInit, Input} from "@angular/core";
import {PipeConnectionService} from "client/service/pipe-connection.service";
import {Router} from "@angular/router";

@Component({
    selector: 'status-row',
    templateUrl: 'client/modules/projects/edit-project/components/shared/status-row/status-row.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/shared/status-row/status-row.component.css',
        'client/modules/projects/edit-project/edit-project.component.css'
    ]
})
export class StatusRowComponent implements OnInit {

    constructor(protected PipeConnectionService: PipeConnectionService,
                private router: Router) {
    }

    ngOnInit() {
        this.pipesListObj = this.PipeConnectionService.pipesListObj;
    }

    @Input('pipe-type') pipeType: 'public_todos' | 'private_todos' | 'tasks';
    protected pipesListObj;

    protected deleteConfirmationIsVisible: boolean = false;

    hideDeleteConfirmation() {
        this.deleteConfirmationIsVisible = false;
    }

    showDeleteConfirmation() {
        this.deleteConfirmationIsVisible = true;
    }

    deletePipe(pipeId: number) {
        return this.PipeConnectionService.deletePipe(pipeId)
            .then(result => {
                return this.router.navigate(['projects']);
            })
    }
}