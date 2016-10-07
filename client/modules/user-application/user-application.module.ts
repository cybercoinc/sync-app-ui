import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {UserApplicationComponent} from 'client/modules/user-application/user-application.component';
import {HomeComponent} from 'client/modules/user-application/home/home.component';
import {ConnectionComponent} from 'client/modules/user-application/connection/connection.component';
import {ProjectsComponent} from 'client/modules/user-application/projects/projects.component';
import {IndexComponent} from 'client/modules/user-application/projects/index/index.component';
import {SyncSessionsComponent} from 'client/modules/user-application/projects/sync-sessions/sync-sessions.component';
import {ItemChangesComponent} from 'client/modules/user-application/projects/sync-sessions/item-changes/item-changes.component';
import {ChooseProcoreProjectComponent} from 'client/modules/user-application/projects/project-wizard/choose-procore-project/choose-procore-project.component';
import {ChooseSmartsheetSheetComponent} from 'client/modules/user-application/projects/project-wizard/choose-smartsheet-project/choose-smartsheet-sheet.component';
import {MatchSheetColumnsComponent} from 'client/modules/user-application/projects/project-wizard/match-sheet-columns/match-sheet-columns.component';
import {SetWorkingWeekDaysComponent} from 'client/modules/user-application/projects/project-wizard/set-working-week-days/set-working-week-days.component';

import {routing} from 'client/modules/user-application/user-application.routing';

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
        BrowserModule,

        MdCardModule,
        MdButtonModule,
        MdToolbarModule,
        MdIconModule,
        MdSidenavModule,
        MdListModule,
        MdTabsModule,
        MdRadioModule,
        MdInputModule,

        routing,
    ],
    exports: [],
    declarations: [
        UserApplicationComponent,
        HomeComponent,
        ConnectionComponent,
        ProjectsComponent,
        IndexComponent,
        SyncSessionsComponent,
        ItemChangesComponent,
        ChooseProcoreProjectComponent,
        ChooseSmartsheetSheetComponent,
        MatchSheetColumnsComponent,
        SetWorkingWeekDaysComponent,
    ],
    providers: [
        MdUniqueSelectionDispatcher
    ],
    bootstrap: [UserApplicationComponent]
})
export class UserApplicationModule {
}