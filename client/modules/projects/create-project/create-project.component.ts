import {Component, OnInit} from "@angular/core";
import {MsProjectClientService} from 'client/service/microservices/ms-project-client.service';
import {AuthService} from 'client/service/auth.service';

@Component({
    moduleId: module.id,
    selector: "create-project",
    templateUrl: 'create-project.component.html',
    styleUrls: ['create-project.component.css'],
})
export class CreateProjectComponent implements OnInit {
    constructor(protected MsProjectClient: MsProjectClientService, protected AuthService: AuthService) {
    }


    ngOnInit(): void {
    }
}