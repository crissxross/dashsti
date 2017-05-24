import { Component, Input, OnInit } from '@angular/core';
// import { ElementRef,  ViewChild } from '@angular/core'; // temporary
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Store } from '@ngrx/store';
import * as PadActions from '../pad-actions';
import * as fromRoot from '../reducers';
// import { TweenMax } from 'gsap';

@Component({
  selector: 'app-actorviz',
  template: `
    <div class="viz-container">

      <svg width="100%" height="300">
        <svg:rect #P x="10" [attr.y]="pY$ |async" width="40px" [attr.height]="pHeight$ | async" [attr.fill]="pFill$ | async"/>
        <svg:rect #A x="60" [attr.y]="aY$ | async" width="40px" [attr.height]="aHeight$ | async" [attr.fill]="aFill$ | async"/>
        <svg:rect #D x="110" [attr.y]="dY$ | async" width="40px" [attr.height]="dHeight$ | async" [attr.fill]="dFill$ | async"/>
        <!--<svg:line x1="0" y1="100" x2="160" y2="100" stroke="white"/>-->
      </svg>

    </div>
  `,
  styleUrls: ['./actorviz.component.css']
})
export class ActorvizComponent implements OnInit {
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
  fillNeg = '#000000';

  constructor(private store: Store<fromRoot.State>) {
    this.pValue$ = store.select(state => state.pad.P);
    this.aValue$ = store.select(state => state.pad.A);
    this.dValue$ = store.select(state => state.pad.D);
   }

  ngOnInit() {
    this.pY$ = this.pValue$.map(x => (x >= 0) ? (100 - x) : 100);
    this.aY$ = this.aValue$.map(x => (x >= 0) ? (100 - x) : 100);
    this.dY$ = this.dValue$.map(x => (x >= 0) ? (100 - x) : 100);

    this.pHeight$ = this.pValue$.map(x => (x < 0) ? Math.abs(x) : x);
    this.aHeight$ = this.aValue$.map(x => (x < 0) ? Math.abs(x) : x);
    this.dHeight$ = this.dValue$.map(x => (x < 0) ? Math.abs(x) : x);

    this.pFill$ = this.pValue$.map(x => (x >= 0) ? this.fillPos : this.fillNeg);
    this.aFill$ = this.aValue$.map(x => (x >= 0) ? this.fillPos : this.fillNeg);
    this.dFill$ = this.dValue$.map(x => (x >= 0) ? this.fillPos : this.fillNeg);

    // TweenMax.to(this.P.nativeElement, 2, { height: this.pHeight, delay: 2, repeat: -1, yoyo: true });
  }

}
