import {Routes, RouterModule} from '@angular/router';
import { UiDemoComponent } from "./ui-demo.component";

export const routes: Routes = [
    {
        path: 'ui-demo',
        component: UiDemoComponent
    },
];

export const routing = RouterModule.forChild(routes);
