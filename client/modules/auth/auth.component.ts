import {Component} from "@angular/core";

@Component({
    template: `
    <div style=" width: 1160px; margin: 0 auto; margin-top: 10px;">
        <h2>Authorization</h2>    
        <router-outlet></router-outlet>
    </div>
  `
})
export class AuthComponent {
}