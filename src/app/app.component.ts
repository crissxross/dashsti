import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <md-sidenav-container>

      <!-- sidenav content -->
      <md-sidenav #sidenav>
        <app-nav (click)="sidenav.close()"></app-nav>
      </md-sidenav>

      <md-toolbar>
        <button md-icon-button (click)="sidenav.toggle()">
          <md-icon>menu</md-icon>
        </button>
        {{title}}
      </md-toolbar>

      <!-- primary content -->
      <div class="main-container">
        <main>
          <router-outlet ></router-outlet>
          <router-outlet name="viz"></router-outlet>
        </main>
      </div>

  </md-sidenav-container>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashsti';
}
