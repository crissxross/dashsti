import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import * as PadActions from '../pad-actions';
import * as fromRoot from '../reducers';

@Component({
  // selector: 'app-dashboard',
  template: `
    <div class="dashboard">

      <div class="sidepanel-container">
        <div class="section">
          <small class="muted">Dashboard for experiments</small>
        </div>
        <md-divider></md-divider>
        <md-nav-list>
          <a md-list-item *ngFor="let id of navIds"
            [routerLink]="['/dashboard/emoviz'+id]"
            routerLinkActive="active">
            emo-viz {{id}}
          </a>
        </md-nav-list>
      </div>

      <div class="main-content-container">
        <div class="main-content">

          <div class="actorviz-container" [ngStyle]="{'background-color': bg}">

            <router-outlet></router-outlet>

          </div>

          <div class="ui-container">
            <app-uicontrols
            (Pleasure)="changeP($event)"
            (Arousal)="changeA($event)"
            (Dominance)="changeD($event)"
            ></app-uicontrols>
            <div class="ui-section">
              <button md-raised-button (click)="toggleBG()">Toggle bg</button>
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
        <!--<div class="section">
          <p><button md-button (click)="resetPAD()">Reset PAD</button></p>
          <small class="muted">(does not reset UI sliders)</small>
        </div>-->
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
  navIds = ['1', '2', '3'];

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
  // Toggles background-color of actorviz-container
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
