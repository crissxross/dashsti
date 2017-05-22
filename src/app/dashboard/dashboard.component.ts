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

      <div class="content-container">
        <div class="content">
          <div class="actorviz-container">
            <app-actorviz
              [pValue]="pValue | async"
              [aValue]="aValue | async"
              [dValue]="dValue | async"
            ></app-actorviz>
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
          <li>Pleasure: {{pValue | async}}%</li>
          <li>Arousal: {{aValue | async}}%</li>
          <li>Dominance: {{dValue | async}}%</li>
        </ul>
        <!--<app-uicontrols></app-uicontrols>-->
        <app-pad-barchart
          [pValue]="pValue | async"
          [aValue]="aValue | async"
          [dValue]="dValue | async"
        ></app-pad-barchart>
      </div>

    </div>
  `,
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  pValue: Observable<number>;
  aValue: Observable<number>;
  dValue: Observable<number>;

  constructor(private store: Store<fromRoot.State>) {
    this.pValue = store.select(state => state.pad.P);
    this.aValue = store.select(state => state.pad.A);
    this.dValue = store.select(state => state.pad.D);
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

}
