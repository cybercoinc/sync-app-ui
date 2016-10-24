import {Component, OnInit, Input} from "@angular/core";

@Component({
    selector: 'pipe-private-todo',
    templateUrl: 'client/modules/projects/edit-project/components/pipe-private-todo/pipe-private-todo.component.html',
    styleUrls: ['client/modules/projects/edit-project/edit-project.component.css'],
})
export class PipePrivateTodoComponent implements OnInit {

    constructor() {

    }

    ngOnInit() {
    }

    @Input('material-icon') materialIcon: string;
}
