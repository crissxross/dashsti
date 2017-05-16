import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <md-sidenav-container>
      <md-sidenav #sidenav>
        <!-- sidenav content -->
        <button md-mini-fab class="menu-fab" (click)="sidenav.toggle()">
        <md-icon>close</md-icon>
        </button>
        <app-nav></app-nav>
      </md-sidenav>
      <!-- primary content -->
      <main fxLayout="row" fxLayoutAlign="space-around">
        <button md-mini-fab class="menu-fab" (click)="sidenav.toggle()">
          <md-icon>menu</md-icon>
        </button>
        <router-outlet ></router-outlet>
      </main>
  </md-sidenav-container>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app works!';
}
