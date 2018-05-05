import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-pad-barchart',
  template: `
    <div class="chart-container">
      <!-- viewBox declared to make SVG responsively scalable -->
      <svg viewBox="0 0 160 200">
        <svg:rect #P x="10" [attr.y]="pY$ | async" width="40" [attr.height]="pHeight$ | async" [attr.fill]="pFill$ | async" />
        <svg:rect #A x="60" [attr.y]="aY$ | async" width="40" [attr.height]="aHeight$ | async" [attr.fill]="aFill$ | async" />
        <svg:rect #D x="110" [attr.y]="dY$ | async" width="40" [attr.height]="dHeight$ | async" [attr.fill]="dFill$ | async" />
        <svg:line x1="0" y1="100" x2="160" y2="100" stroke="white"/>
      </svg>
      <div class="labels">
        <ul>
          <li>P</li>
          <li>A</li>
          <li>D</li>
        </ul>
        <ul>
          <li><small>{{pValue$ | async | number: '1.0-1'}}</small></li>
          <li><small>{{aValue$ | async | number: '1.0-1'}}</small></li>
          <li><small>{{dValue$ | async | number: '1.0-1'}}</small></li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./pad-barchart.component.css']
})
export class PadBarchartComponent implements OnInit {
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  pY$: Observable<number>;
  aY$: Observable<number>;
  dY$: Observable<number>;
  pHeight$: Observable<number>;
  aHeight$: Observable<number>;
  dHeight$: Observable<number>;
  pFill$: Observable<string>;
  aFill$: Observable<string>;
  dFill$: Observable<string>;
  fillPos = '#c0c0c0';
  fillNeg = '#7f7f7f';

  constructor(private store: Store<fromRoot.State>) {
    this.pValue$ = store.select(state => state.pad.P);
    this.aValue$ = store.select(state => state.pad.A);
    this.dValue$ = store.select(state => state.pad.D);
   }

  ngOnInit() {
    this.pY$ = this.pValue$.pipe(map(v => (v >= 0) ? 100 - (v * 100) : 100));
    this.aY$ = this.aValue$.pipe(map(v => (v >= 0) ? 100 - (v * 100) : 100));
    this.dY$ = this.dValue$.pipe(map(v => (v >= 0) ? 100 - (v * 100) : 100));

    this.pHeight$ = this.pValue$.pipe(map(v => (v < 0) ? Math.abs(v) * 100 : v * 100));
    this.aHeight$ = this.aValue$.pipe(map(v => (v < 0) ? Math.abs(v) * 100 : v * 100));
    this.dHeight$ = this.dValue$.pipe(map(v => (v < 0) ? Math.abs(v) * 100 : v * 100));

    this.pFill$ = this.pValue$.pipe(map(v => (v >= 0) ? this.fillPos : this.fillNeg));
    this.aFill$ = this.aValue$.pipe(map(v => (v >= 0) ? this.fillPos : this.fillNeg));
    this.dFill$ = this.dValue$.pipe(map(v => (v >= 0) ? this.fillPos : this.fillNeg));
  }

}
