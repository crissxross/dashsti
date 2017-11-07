import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <mat-sidenav-container>

      <!-- sidenav content -->
      <mat-sidenav #sidenav>
        <app-nav (click)="sidenav.close()"></app-nav>
      </mat-sidenav>

      <mat-toolbar>
        <button mat-icon-button (click)="sidenav.toggle()">
          <mat-icon>menu</mat-icon>
        </button>
        {{title}}
      </mat-toolbar>

      <!-- primary content -->
      <div class="main-container">
        <main>
          <router-outlet ></router-outlet>
        </main>
      </div>

  </mat-sidenav-container>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dashsti';
}
