import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector: 'pipe-public-todo',
    templateUrl: 'client/modules/projects/edit-project/components/pipe-public-todo/pipe-public-todo.component.html',
    styleUrls: ['client/modules/projects/edit-project/edit-project.component.css'],
})
export class PipePublicTodoComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

    @Input('material-icon') materialIcon: string;
}
