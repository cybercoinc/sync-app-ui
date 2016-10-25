import {Component, OnInit} from "@angular/core";


import {AuthService} from 'client/service/auth.service';



@Component({
    selector: "billing",
    templateUrl: 'client/modules/billing/billing.component.html',
    styleUrls: ['client/modules/billing/billing.component.css'],
})
export class BillingComponent implements OnInit {
    ngOnInit() {

    }

    constructor(protected AuthService: AuthService) {

    }
}