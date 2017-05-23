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
            <app-actorviz></app-actorviz>
          </div>
          <div class="ui-container">
            <app-uicontrols
            (Pleasure)="changeP($event)"
            (Arousal)="changeA($event)"
            (Dominance)="changeD($event)"
            ></app-uicontrols>
          </div>
        </div>
      </div>

      <div class="sidepanel-container">
        <h3 class="muted">P A D</h3>
        <ul>
          <li>Pleasure: {{pValue$| async}}%</li>
          <li>Arousal: {{aValue$ | async}}%</li>
          <li>Dominance: {{dValue$ | async}}%</li>
        </ul>
        <!--<app-uicontrols></app-uicontrols>-->
        <app-pad-barchart></app-pad-barchart>
        <div class="section">
          <button md-raised-button (click)="resetPAD()">Reset PAD</button>
        </div>
        <br>
        <small class="muted">NOTE: Reset does not currently reset UI slider controls.</small>
      </div>

    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;

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
  // Currently, does not reset UI slider controls
  resetPAD() {
    this.store.dispatch(new PadActions.Reset());
  }

}
