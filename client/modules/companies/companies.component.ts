import {Component, OnInit} from "@angular/core";


import {AuthService} from 'client/service/auth.service';



@Component({
    selector: "companies",
    templateUrl: 'client/modules/companies/companies.component.html',
    styleUrls: ['client/modules/companies/companies.component.css'],
})
export class CompaniesComponent implements OnInit {
    ngOnInit() {

    }

    constructor(protected AuthService: AuthService) {

    }
}