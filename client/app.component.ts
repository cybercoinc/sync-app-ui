import {Component, ViewEncapsulation} from "@angular/core";
import "rxjs/add/operator/map";
import {MdIconRegistry} from '@angular2-material/icon';

@Component({
    selector: 'app',
    templateUrl: 'client/app.component.html',
    styleUrls: ['client/app.component.css'],
    viewProviders: [MdIconRegistry],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    appName: string = 'Schedule Connector';

    constructor(mdIconRegistry: MdIconRegistry) {
        mdIconRegistry
            .addSvgIcon('thumb-up', '/assets/svg/thumbup-icon.svg')
            .addSvgIconSetInNamespace('core', '/assets/svg/core-icon-set.svg')
            .registerFontClassAlias('fontawesome', 'fa');
    }
}