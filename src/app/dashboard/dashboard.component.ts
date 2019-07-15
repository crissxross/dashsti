import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as PadActions from '../actions/pad.actions';
import * as fromPad from '../reducers';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">

      <div class="sidepanel-container">
        <div class="section">
          <small class="muted">Dashboard for experiments</small>
        </div>
        <mat-divider></mat-divider>
        <mat-nav-list>
          <a mat-list-item *ngFor="let id of navIds"
            [routerLink]="['/dashboard/emoviz'+id]"
            routerLinkActive="active">
            emo-viz {{id}}
          </a>
        </mat-nav-list>
      </div>

      <div class="main-content-container">
        <div class="main-content">

          <div class="actorviz-container" [ngStyle]="{'background-color': bg}">

            <router-outlet></router-outlet>

            <div *ngIf="showText" class="actor-speaks">
              This is roughly where the NPC actor speaks.
              The font and style of this placeholder text are temporary. The character's speech will animate in and animate out.
            </div>

          </div>

          <div class="ui-container">
            <div class="ui-section">
              <app-uicontrols
              (Pleasure)="changeP($event)"
              (Arousal)="changeA($event)"
              (Dominance)="changeD($event)"
              [show]="showSliders"
              ></app-uicontrols>
            </div>
            <div class="ui-section">
              <!-- Specific emotional states -->
              <mat-button-toggle-group vertical>
                <mat-button-toggle (click)="angry()">Angry -++</mat-button-toggle>
                <mat-button-toggle (click)="fear()">Fearful -+-</mat-button-toggle>
                <mat-button-toggle (click)="comfortable()">Comfortable +-+</mat-button-toggle>
                <mat-button-toggle (click)="elated()" >Elated +++</mat-button-toggle>
                <mat-button-toggle (click)="bored()">Bored ---</mat-button-toggle>
                <mat-button-toggle (click)="impressed()">Impressed ++-</mat-button-toggle>
                <mat-button-toggle (click)="uncaring()">Uncaring --+</mat-button-toggle>
                <mat-button-toggle (click)="sleepy()">( sleepy +-- )</mat-button-toggle>
                <mat-button-toggle (click)="resetPAD()">Reset to 0</mat-button-toggle>
              </mat-button-toggle-group>
            </div>
          </div>
        </div>
      </div>

      <div class="sidepanel-container">
        <h3 class="muted">P A D</h3>
        <app-pad-barchart></app-pad-barchart>
        <div class="section muted">
        <table>
          <tr>
            <td>Pleasure:</td>
            <td>{{pValue$ | async | percent}}</td>
          </tr>
          <tr>
            <td>Arousal:</td>
            <td>{{aValue$ | async | percent}}</td>
          </tr>
          <tr>
            <td>Dominance:</td>
            <td>{{dValue$ | async | percent}}</td>
          </tr>
        </table>
        </div>
        <button mat-raised-button (click)="toggleText()">Toggle text</button>
        <button mat-raised-button (click)="toggleBG()">Toggle bg</button>
        <p class="citations">Specific emotional state PAD ratings from:
          <cite>
            <a href="http://psycnet.apa.org/journals/xge/123/4/394/">
            Valdez and Mehrabian, 1994</a>;
            <a href="http://www.kaaj.com/psych/scales/emotion.html">
            Mehrabian, 2010</a>
          </cite>.
        </p>
      </div>

    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  bg = '#303030'; // matches main bg color
  BGCOLORS = ['hsl(0, 30%, 10%)', 'hsl(137, 20%, 10%)', '#303030'];
  // navIds just for the useful/workable emoviz components:
  // navIds = ['1', '2', '2a', '3a', '3b', '7', '7a', '7b', '7c', '8', '9', '10', '10a', '11', 'x', 'y'];
  // navIds for most useful for reference
  navIds = ['1', '2', '2a', '3a', '3b', '7', '8', '11', '12', '13', '14', '15', '16'];
  // navIds = ['1', '2', '2a', '3', '3a', '3b', '4', '5', '6', '7', '7a', '7b', '7c', '8', '9', '10', '10a', '11', 'x', 'y', 'z'];
  // navIds = ['1', '2', '2a', '3', '3a']; // links for public demo MIX & ELO
  showSliders = true;
  showText = false;

  constructor(private store: Store<fromPad.State>) {
    this.pValue$ = store.pipe(select(fromPad.getP));
    this.aValue$ = store.pipe(select(fromPad.getA));
    this.dValue$ = store.pipe(select(fromPad.getD));
  }

  ngOnInit() {}

  changeP(event) {
    this.store.dispatch(PadActions.changeP({pleasure: event}));
  }

  changeA(event) {
    this.store.dispatch(PadActions.changeA({arousal: event}));
  }

  changeD(event) {
    this.store.dispatch(PadActions.changeD({dominance: event}));
  }
  /**
   * Note: show/hide & reset UI slider controls functionality
   * does not keep all UI perfectly in sync but it will suffice.
   */
  resetPAD() {
    this.store.dispatch(PadActions.reset());
    this.showSliders = !this.showSliders;
    // this.showSliders = true;
  }
  // Toggles background-color of actorviz-container
  toggleBG() {
    const next = (this.BGCOLORS.indexOf(this.bg) + 1) % this.BGCOLORS.length;
    this.bg = this.BGCOLORS[next];
  }
  toggleText() {
    this.showText = !this.showText;
  }
  // hostile PAD mood octant -++
  angry() {
    this.store.dispatch(PadActions.changeP({pleasure: -0.51}));
    this.store.dispatch(PadActions.changeA({arousal: 0.59}));
    this.store.dispatch(PadActions.changeD({dominance: 0.25}));
    this.showSliders = false;
  }
  // anxious PAD mood octant -+-
  fear() {
    this.store.dispatch(PadActions.changeP({pleasure: -0.64}));
    this.store.dispatch(PadActions.changeA({arousal: 0.6}));
    this.store.dispatch(PadActions.changeD({dominance: -0.43}));
    this.showSliders = false;
  }
  // relaxed PAD mood octant +-+
  comfortable() {
    this.store.dispatch(PadActions.changeP({pleasure: 0.85}));
    this.store.dispatch(PadActions.changeA({arousal: -0.19}));
    this.store.dispatch(PadActions.changeD({dominance: 0.13}));
    this.showSliders = false;
  }
  // exuberant PAD mood octant +++
  elated() {
    this.store.dispatch(PadActions.changeP({pleasure: 0.5}));
    this.store.dispatch(PadActions.changeA({arousal: 0.42}));
    this.store.dispatch(PadActions.changeD({dominance: 0.23}));
    this.showSliders = false;
  }
  // bored PAD mood octant ---
    bored() {
    this.store.dispatch(PadActions.changeP({pleasure: -0.65}));
    this.store.dispatch(PadActions.changeA({arousal: -0.62}));
    this.store.dispatch(PadActions.changeD({dominance: -0.33}));
    this.showSliders = false;
    }
  // dependent PAD mood octant ++-
    impressed() {
    this.store.dispatch(PadActions.changeP({pleasure: 0.41}));
    this.store.dispatch(PadActions.changeA({arousal: 0.30}));
    this.store.dispatch(PadActions.changeD({dominance: -0.32}));
    this.showSliders = false;
    }
  // disdainful PAD mood octant --+
  uncaring() {
    this.store.dispatch(PadActions.changeP({pleasure: -0.32}));
    this.store.dispatch(PadActions.changeA({arousal: -0.12}));
    this.store.dispatch(PadActions.changeD({dominance: 0.28}));
    this.showSliders = false;
  }
  // docile PAD mood octant +--
  sleepy() {
    this.store.dispatch(PadActions.changeP({pleasure: 0.2}));
    this.store.dispatch(PadActions.changeA({arousal: -0.7}));
    this.store.dispatch(PadActions.changeD({dominance: -0.44}));
    this.showSliders = false;
  }

}
