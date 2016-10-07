import {Component} from "@angular/core";
import "rxjs/add/operator/map";

@Component({
    selector: 'app',
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent {
    appName: string = 'Schedule Connector';
}