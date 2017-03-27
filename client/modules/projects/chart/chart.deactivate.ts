import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {ChartComponent} from "./chart.component";
import {Observable} from "rxjs/Observable";

@Injectable()
export class CanDeactivateChart implements CanDeactivate<ChartComponent> {
    constructor() {
    }

    canDeactivate(component: ChartComponent,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        return confirm('deactivate?');
        // return false;
    }
}