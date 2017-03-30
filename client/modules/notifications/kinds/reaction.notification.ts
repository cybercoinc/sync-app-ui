import {BaseNotification} from "./base.notification";
import {Component, Input, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'reaction-notification-card',
    template: `
        <div class="col-xs-12" *ngIf="!notification.isViewed()">
            <md-card class="reaction-notification {{notification.getType()}}">
                <md-card-header>
                    <md-card-title>
                        {{notification.getTitle()}}
                    </md-card-title>
                </md-card-header>

                <md-card-content>
                    {{notification.getMessage()}}
                </md-card-content>

                <md-card-actions>
                    <div class="buttons-container">
                        <button (click)="goTo(possibilityObj.route)" md-button
                                *ngFor="let possibilityObj of notification.getPossibilities()">
                            {{possibilityObj.label}}
                        </button>
                        <!--<button md-button (click)="cancel()">Cancel</button>-->
                    </div>

                </md-card-actions>

            </md-card>
        </div>
    `,
    styles: [
            `
            .mat-card.info {
                background-color: #f9fff7;
            }

            .mat-card.error {
                background-color: #fff7f7;
            }

            .mat-card.warning {
                background-color: #fffcf7;
            }

            .mat-card-title, .mat-card-header, .mat-card-subtitle {
                font-size: 16px;
            }

            .mat-card-content {
                font-size: 14px;
            }

            .mat-card.info md-card-header {
                color: green;
            }

            .mat-card.warning md-card-header {
                color: orange;
            }

            .mat-card.error md-card-header {
                color: red;
            }

            .buttons-container {
                width: 100%;
                text-align: center;
            }
        `
    ]
})
export class ReactionNotificationCard implements OnInit {
    constructor(protected Router: Router) {
    }

    ngOnInit() {

    }

    cancel() {
        this.notification.hide();
    }

    goTo(routeList) {
        this.notification.hide();

        this.Router.navigate(routeList);
    }

    @Input() notification: ReactionNotification;
}

export class ReactionPossibility {
    label: string;
    route: string[]
}


export class ReactionNotification extends BaseNotification {
    protected position: 'reaction';

    public hide() {
        this.viewed = true;
    }

    public isViewed() {
        return this.viewed;
    }

    public setTitle(title) {
        this.title = title;
    }

    public getTitle() {
        return this.title;
    }

    protected possibilities: ReactionPossibility[] = [];

    public addPossibility(possibility) {
        this.possibilities.push(possibility);
    }

    public getPossibilities() {
        return this.possibilities;
    }

    protected title: string;
}