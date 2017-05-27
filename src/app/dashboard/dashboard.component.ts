import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as PadActions from '../pad-actions';
import * as fromRoot from '../reducers';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">

      <div class="sidepanel-container">
        <p class="muted">Dashboard for emo-viz experiments</p>
      </div>

      <div class="main-content-container">
        <div class="main-content">
          <div class="actorviz-container">
            <!--<app-actorviz [bg]="bg"></app-actorviz>-->
            <app-emoviz [bg]="bg"></app-emoviz>
          </div>
          <div class="ui-container">
            <app-uicontrols
            (Pleasure)="changeP($event)"
            (Arousal)="changeA($event)"
            (Dominance)="changeD($event)"
            ></app-uicontrols>
            <div class="ui-section">
              <button md-raised-button (click)="toggleBG()">toggle bg</button>
              <small class="muted section">specific emotional states</small>
              <md-button-toggle-group vertical>
                <md-button-toggle (click)="anger()">anger</md-button-toggle>
                <md-button-toggle (click)="fear()">fear</md-button-toggle>
                <md-button-toggle (click)="joy()" >joy</md-button-toggle>
                <md-button-toggle (click)="relaxed()">relaxed</md-button-toggle>
                <md-button-toggle (click)="anxious()">anxious</md-button-toggle>
                <md-button-toggle (click)="resetPAD()">reset to 0</md-button-toggle>
              </md-button-toggle-group>
            </div>
          </div>
        </div>
      </div>

      <div class="sidepanel-container">
        <h3 class="muted">P A D</h3>
        <app-pad-barchart></app-pad-barchart>
        <div class="section muted">
          <ul>
            <li>Pleasure: {{pValue$ | async | percent}}</li>
            <li>Arousal: {{aValue$ | async | percent}}</li>
            <li>Dominance: {{dValue$ | async | percent}}</li>
          </ul>
        </div>
        <div class="section">
          <button md-button (click)="resetPAD()">Reset PAD</button>
        </div>
        <small class="muted">(does not reset UI sliders)</small>
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
  BGCOLORS = ['hsla(0, 80%, 50%, 0.1)', 'hsla(137, 80%, 50%, 0.1)', '#303030'];

  constructor(private store: Store<fromRoot.State>) {
    this.pValue$ = store.select(state => state.pad.P);
    this.aValue$ = store.select(state => state.pad.A);
    this.dValue$ = store.select(state => state.pad.D);
  }

  ngOnInit() {
  }

  changeP(event) {
    this.store.dispatch(new PadActions.ChangeP(event));
  }

  changeA(event) {
    this.store.dispatch(new PadActions.ChangeA(event));
  }

  changeD(event) {
    this.store.dispatch(new PadActions.ChangeD(event));
  }
  // Note: this does not reset UI slider controls
  resetPAD() {
    this.store.dispatch(new PadActions.Reset());
  }

  toggleBG() {
    const next = (this.BGCOLORS.indexOf(this.bg) + 1) % this.BGCOLORS.length;
    this.bg = this.BGCOLORS[next];
  }

  anger() {
    this.store.dispatch(new PadActions.ChangeP(-1));
    this.store.dispatch(new PadActions.ChangeA(1));
    this.store.dispatch(new PadActions.ChangeD(1));
  }

  fear() {
    this.store.dispatch(new PadActions.ChangeP(-1));
    this.store.dispatch(new PadActions.ChangeA(1));
    this.store.dispatch(new PadActions.ChangeD(-1));
  }

  joy() {
    this.store.dispatch(new PadActions.ChangeP(1));
    this.store.dispatch(new PadActions.ChangeA(1));
    this.store.dispatch(new PadActions.ChangeD(0.2));
  }

  relaxed() {
    this.store.dispatch(new PadActions.ChangeP(0.8));
    this.store.dispatch(new PadActions.ChangeA(-0.2));
    this.store.dispatch(new PadActions.ChangeD(-0.5));
  }

  anxious() {
    this.store.dispatch(new PadActions.ChangeP(-0.2));
    this.store.dispatch(new PadActions.ChangeA(0.8));
    this.store.dispatch(new PadActions.ChangeD(-0.2));
  }

}
