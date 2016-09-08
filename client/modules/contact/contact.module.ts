import {NgModule} from '@angular/core';
import {HttpModule} from "@angular/http";
import {NgSemanticModule} from "ng-semantic";

import {ContactComponent} from "./home/home.component";
import {routing} from "./contact.routing";
import {SharedModule} from "../shared/shared.module";
import {FormComponent} from "./form/form.component";
import {ProfileComponent} from "./profile/profile.component";

import {CardDemoComponent} from "./card-demo/card-demo";
import {MdCardModule} from '@angular2-material/card';
import {MdButtonModule} from '@angular2-material/button';

@NgModule({
    imports: [
        HttpModule,
        NgSemanticModule,
        routing,
        MdButtonModule,
        MdCardModule,
        SharedModule.forRoot()
    ],
    exports: [ProfileComponent],
    declarations: [ContactComponent, FormComponent, ProfileComponent, CardDemoComponent],
    bootstrap: [ContactComponent]
})
export class ContactModule {
}