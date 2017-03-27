import {Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from "@angular/router";
import {ChartComponent} from "./chart.component";
import {Observable} from "rxjs/Observable";
import {NotificationsService} from "client/modules/notifications/notifications.service";

@Injectable()
export class CanDeactivateChart implements CanDeactivate<ChartComponent> {
    constructor(protected NotificationsService: NotificationsService) {
    }

    canDeactivate(component: ChartComponent,
                  currentRoute: ActivatedRouteSnapshot,
                  currentState: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        this.NotificationsService.addInfo('Deactivate?');

        return confirm('deactivate?');
        // return false;
    }
}