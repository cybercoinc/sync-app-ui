import {Component} from "@angular/core";
import {Component, ViewEncapsulation} from "@angular/core";
import {MdIconRegistry} from '@angular2-material/icon';

@Component({
    selector: 'user-application',
    templateUrl: 'client/modules/user-application/user-application.component.html',
    styleUrls: ['client/modules/user-application/user-application.component.css'],
    viewProviders: [MdIconRegistry],
    encapsulation: ViewEncapsulation.None
})
export class UserApplicationComponent {
}