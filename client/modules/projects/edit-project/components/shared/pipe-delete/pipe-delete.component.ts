import {Component, OnInit, Input} from "@angular/core";
import {PipeConnectionService} from "client/service/pipe-connection.service";
import {Router} from "@angular/router";
import {ProjectPipe} from "client/entities/entities";

@Component({
    selector: 'pipe-delete',
    templateUrl: 'client/modules/projects/edit-project/components/shared/pipe-delete/pipe-delete.component.html',
    styleUrls: [
        'client/modules/projects/edit-project/components/shared/pipe-delete/pipe-delete.component.css',
        'client/modules/projects/edit-project/edit-project.component.css',
    ],
})
export class PipeDeleteComponent implements OnInit {
    constructor(protected PipeConnectionService: PipeConnectionService,
                protected Router: Router) {
    }

    @Input('pipe') pipe: ProjectPipe;

    ngOnInit() {
    }

    isConfirmationVisible: boolean = false;
    deleteButtonDisabled: boolean = false;

    showConfirmation() {
        return this.isConfirmationVisible = true;
    }

    disconnectPipe() {
        this.deleteButtonDisabled = true;

        let promises = [];

        if (this.pipe.status !== 'disabled') {
            promises.push(
                this.PipeConnectionService.disablePipe(this.pipe.id)
            );
        }

        return Promise.all(promises)
            .then(() => {
                return this.PipeConnectionService.deletePipe(this.pipe.id);
            })
            .then(() => {
                return this.Router.navigate(['projects']);
            })
            .catch(err => {
                this.deleteButtonDisabled = true;

                throw err;
            });
    }

}
