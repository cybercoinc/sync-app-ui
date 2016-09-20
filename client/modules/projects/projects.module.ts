import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {IndexComponent} from './index/index.component';
import {ProjectsComponent} from './projects.component';

import {ProjectWizardComponent} from './project-wizard/project-wizard.component';
import {ChooseProcoreProjectComponent} from './project-wizard/choose-procore-project/choose-procore-project.component';
import {ChooseSmartsheetProjectComponent} from './project-wizard/choose-smartsheet-project/choose-smartsheet-project.component';

import {routing} from "./projects.routing";


import {MdCardModule} from '@angular2-material/card';
import {MdButtonModule} from '@angular2-material/button';
import {MdToolbarModule} from '@angular2-material/toolbar';
import {MdIconModule} from '@angular2-material/icon';
import {MdSidenavModule} from '@angular2-material/sidenav';
import {MdTabsModule} from '@angular2-material/tabs';
import {MdListModule} from '@angular2-material/list';
import {MdRadioModule} from '@angular2-material/radio';
import {MdInputModule} from '@angular2-material/input';
import {MdUniqueSelectionDispatcher} from '@angular2-material/core';


@NgModule({
    imports: [
        MdCardModule,
        MdButtonModule,
        MdToolbarModule,
        MdIconModule,
        MdSidenavModule,
        MdListModule,
        MdTabsModule,
        MdRadioModule,
        MdInputModule,

        CommonModule,
        routing,
    ],
    exports: [],
    declarations: [
        IndexComponent,
        ProjectsComponent,
        ProjectWizardComponent,
        ChooseProcoreProjectComponent,
        ChooseSmartsheetProjectComponent
    ],
    providers: [
        MdUniqueSelectionDispatcher
    ],
    bootstrap: [ProjectsComponent]
})
export class ProjectsModule {
}