import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'app-emoviz1',
  template: `
    <div class="viz-container">

      <svg>
        <svg:rect #P
          [attr.x]="pX$ | async"
          [attr.y]="pY$ |async"
          [attr.width]="pWidth$ | async"
          [attr.height]="pHeight$ | async"
          [attr.fill]="pFill"
          [attr.opacity]="pOpacity$ | async"/>
        <svg:rect #A
          [attr.x]="aX$ | async"
          [attr.y]="aY$ | async"
          [attr.width]="aWidth$ | async"
          [attr.height]="aHeight$ | async"
          [attr.fill]="aFill"
          [attr.opacity]="aOpacity$ | async"/>
        <svg:rect #D
          [attr.x]="dX$ | async"
          [attr.y]="dY$ | async"
          [attr.width]="dWidth$ | async"
          [attr.height]="dHeight$ | async"
          [attr.fill]="dFill"
          [attr.opacity]="dOpacity$ | async"/>
      </svg>

      <div class="notes">Notes<br>
        Same as bar chart except:
        <ul>
          <li>{{pNote}}</li>
          <li>{{aNote}}</li>
          <li>{{dNote}}</li>
        </ul>
      </div>

    </div>
  `,
  styleUrls: ['../emoviz.css', './emoviz1.component.css']
})
export class Emoviz1Component implements OnInit {
  // @Input() bg;
// PAD properties
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
  fillPos = 'hsl(0, 70%, 50%)'; // '#c0c0c0';
  fillNeg = 'hsl(0, 50%, 50%)'; // '#000000';
  pFill = 'hsl(0, 70%, 50%)';
  aFill = 'hsl(0, 50%, 80%)';
  dFill = 'hsl(0, 40%, 45%)';
  pNote: string;
  aNote: string;
  dNote: string;

  constructor(private store: Store<fromRoot.State>) {
    this.pValue$ = store.select(state => state.pad.P);
    this.aValue$ = store.select(state => state.pad.A);
    this.dValue$ = store.select(state => state.pad.D);
   }

  ngOnInit() {
    this.pNote = 'P: opacity varies saturation';
    this.aNote = 'A: opacity varies lightness';
    this.dNote = 'D: width varies';

// P
    this.pX$ = this.pValue$.pipe(map(v => (v >= 0) ? 60 + v : 60)); // minimal change
    this.pY$ = this.pValue$.pipe(map(v => (v >= 0) ? 150 - (v * 100) : 150));
    this.pWidth$ = this.pValue$.pipe(map(v => (v >= 0) ? 50 + v : 50)); // minimal change
    this.pHeight$ = this.pValue$.pipe(map(v => (v < 0) ? Math.abs(v) * 100 + 10 : v * 100 + 10));
    // note: using opacity to govern saturation, 0.55 so opacity is never 0
    this.pOpacity$ = this.pValue$.pipe(map(v => (v > 0) ? 0.55 + (v / 2) : 0.55 - (Math.abs(v) / 2)));
    // this.pFill$ = this.pValue$.pipe(map(v => (v >= 0) ? this.fillPos : this.fillNeg));

// A
    this.aX$ = this.aValue$.pipe(map(v => (v >= 0) ? 170 + v : 170)); // minimal change
    this.aY$ = this.aValue$.pipe(map(v => (v >= 0) ? 150 - (v * 100) : 150));
    this.aWidth$ = this.aValue$.pipe(map(v => (v >= 0) ? 50 + v : 50)); // minimal change
    this.aHeight$ = this.aValue$.pipe(map(v => (v < 0) ? Math.abs(v) * 100 + 10 : v * 100 + 10));
    // note: using opacity to govern lightness (not ideal)
    this.aOpacity$ = this.aValue$.pipe(map(v => (v > 0) ? 0.55 + (v / 2) : 0.55 - (Math.abs(v) / 2)));
    // this.aFill$ = this.aValue$.pipe(map(v => (v >= 0) ? this.fillPos : this.fillNeg));

// D
    this.dX$ = this.dValue$.pipe(map(v => (v >= 0) ? 280 + v : 280)); // minimal change
    this.dY$ = this.dValue$.pipe(map(v => (v >= 0) ? 150 - (v * 100) : 150));
    this.dWidth$ = this.dValue$.pipe(map(v => (v > 0) ? 50 + (v * 45) : 50 - Math.abs(v) * 45));
    this.dHeight$ = this.dValue$.pipe(map(v => (v < 0) ? Math.abs(v) * 100 + 10 : v * 100 + 10));
    this.dOpacity$ = this.dValue$.pipe(map(v => (v > 0) ? 0.8 + (v / 10) : 0.8 - (Math.abs(v) / 10))); // minimal change
    // this.dFill$ = this.dValue$.pipe(map(v => (v >= 0) ? this.fillPos : this.fillNeg));

    // Note: roughly centred the rects above within the svg space
  }

}
