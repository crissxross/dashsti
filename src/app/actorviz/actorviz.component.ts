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

      <svg width="400" height="300">
        <svg:rect #P
          [attr.x]="pX$ | async" [attr.y]="pY$ |async"
          [attr.width]="pWidth$ | async" [attr.height]="pHeight$ | async"
          [attr.fill]="pFill$ | async" [attr.opacity]="pOpacity$ | async"/>
        <svg:rect #A
          [attr.x]="aX$ | async" [attr.y]="aY$ | async"
          [attr.width]="aWidth$ | async" [attr.height]="aHeight$ | async"
          [attr.fill]="aFill$ | async" [attr.opacity]="aOpacity$ | async"/>
        <svg:rect #D
          [attr.x]="dX$ | async" [attr.y]="dY$ | async"
          [attr.width]="dWidth$ | async" [attr.height]="dHeight$ | async"
          [attr.fill]="dFill$ | async" [attr.opacity]="dOpacity$ | async"/>
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
  pX$: Observable<number>;
  aX$: Observable<number>;
  dX$: Observable<number>;
  pY$: Observable<number>;
  aY$: Observable<number>;
  dY$: Observable<number>;
  pWidth$: Observable<number>;
  aWidth$: Observable<number>;
  dWidth$: Observable<number>;
  pHeight$: Observable<number>;
  aHeight$: Observable<number>;
  dHeight$: Observable<number>;
  pFill$: Observable<string>;
  aFill$: Observable<string>;
  dFill$: Observable<string>;
  pOpacity$: Observable<number>;
  aOpacity$: Observable<number>;
  dOpacity$: Observable<number>;
  fillPos = 'hsl(0, 50%, 50%)'; // '#c0c0c0';
  fillNeg = 'hsl(0, 40%, 20%)'; // '#000000';


  constructor(private store: Store<fromRoot.State>) {
    this.pValue$ = store.select(state => state.pad.P);
    this.aValue$ = store.select(state => state.pad.A);
    this.dValue$ = store.select(state => state.pad.D);
   }

  ngOnInit() {
  // roughly centred the rects within the svg space
    this.pX$ = this.pValue$.map(v => (v >= 0) ? 60 + (v * 100) : 60);
    this.aX$ = this.aValue$.map(v => (v >= 0) ? 170 + (v * 100) : 170);
    this.dX$ = this.dValue$.map(v => (v >= 0) ? 280 + (v * 100) : 280);

    this.pY$ = this.pValue$.map(v => (v >= 0) ? 150 - (v * 100) : 150);
    this.aY$ = this.aValue$.map(v => (v >= 0) ? 150 - (v * 100) : 150);
    this.dY$ = this.dValue$.map(v => (v >= 0) ? 150 - (v * 100) : 150);

    this.pWidth$ = this.pValue$.map(v => (v >= 0) ? 50 + (v * 100) : 50);
    this.aWidth$ = this.aValue$.map(v => (v >= 0) ? 50 + (v * 100) : 50);
    this.dWidth$ = this.dValue$.map(v => (v >= 0) ? 50 + (v * 100) : 50);

    this.pHeight$ = this.pValue$.map(v => (v < 0) ? Math.abs(v) * 100 : v * 100 + 1);
    this.aHeight$ = this.aValue$.map(v => (v < 0) ? Math.abs(v) * 100 : v * 100 + 1);
    this.dHeight$ = this.dValue$.map(v => (v < 0) ? Math.abs(v) * 100 : v * 100 + 1);

    this.pFill$ = this.pValue$.map(v => (v >= 0) ? this.fillPos : this.fillNeg);
    this.aFill$ = this.aValue$.map(v => (v >= 0) ? this.fillPos : this.fillNeg);
    this.dFill$ = this.dValue$.map(v => (v >= 0) ? this.fillPos : this.fillNeg);

    // note: trying to avoid zero opacity
    this.pOpacity$ = this.pValue$.map(v => (v >= 0) ? v + 0.1 : 1.1 - Math.abs(v));
    this.aOpacity$ = this.aValue$.map(v => (v >= 0) ? v + 0.1 : 1.1 - Math.abs(v));
    this.dOpacity$ = this.dValue$.map(v => (v >= 0) ? v + 0.1 : 1.1 - Math.abs(v));

    // TweenMax.to(this.P.nativeElement, 2, { height: this.pHeight, delay: 2, repeat: -1, yoyo: true });
  }

}
