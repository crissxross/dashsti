import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromPad from '../../reducers';

import { TweenMax, Power1 } from 'gsap/TweenMax';
import { polarToCartesianX, polarToCartesianY } from '../../shared/utils';

@Component({
  selector: 'app-svg16',
  templateUrl: './svg16.component.svg',
  styleUrls: ['./svg16.component.css']
})
export class Svg16Component implements OnInit, OnDestroy {
  @ViewChild('emoShape', {static: true}) _emoShape: ElementRef;

  get emoShape(): SVGPathElement {
    return this._emoShape.nativeElement;
  }

  viewportWidth = 150;
  viewportHeight = 150;
  cx = this.viewportWidth * 0.5;
  // cy drop down a little to make room for top curve when a circle
  cy = this.viewportHeight * 0.59;
  sideLength = 100;
  // calculate height of equilateral triangle (see myNOTES)
  triHeight = Math.round(this.sideLength * Math.sqrt(3) / 2) ;
  radius = 45; // for control points, 45 gives perfect circle
  leftX = this.cx - this.sideLength / 2;
  leftY = this.cy - this.triHeight / 2;
  rightX = this.cx + this.sideLength / 2;
  rightY = this.leftY; // this.cy - this.triHeight / 2;
  midX = this.cx;
  midY = this.cy + this.triHeight / 2;
  // control points for curves
  cLRx1: number;
  cLRy1: number;
  cLRx2: number;
  cLRy2: number;
  cRMx1: number;
  cRMy1: number;
  cRMx2: number;
  cRMy2: number;
  cMLx1: number;
  cMLy1: number;
  cMLx2: number;
  cMLy2: number;
  saturation: number;
  lightness: number;
  alpha: number;

  // PAD properties
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  PADprogress: Subscription;
  pSubscription: Subscription;

  constructor(private store: Store<fromPad.State>) {
    this.pValue$ = store.pipe(select(fromPad.getP));
    this.aValue$ = store.pipe(select(fromPad.getA));
    this.dValue$ = store.pipe(select(fromPad.getD));
  }

  ngOnInit() {
    TweenMax.set(this.emoShape, {
      fill: 'hsla(0, 50%, 50%, 0.75)',
      // stroke: 'hsla(0, 50%, 50%, 0.5)'
    });

    // PAD
    // combineLatest takes an optional mapping function (last) after input Observables
    // NOTE: combineLatest is used here as a static method of Observable class
    this.PADprogress = combineLatest(this.pValue$, this.aValue$, this.dValue$, (p, a, d) => ({
      P: p,
      A: a,
      D: d
    })).subscribe(pad => {
      console.log('Latest PAD:', pad.P, pad.A, pad.D);

      this.radius = Math.round(pad.P * 22.5 + 22.5);
      // TODO: HSLA values maybe should use combined PAD values - e.g. saturation is a combination of P & A
      this.saturation = 60 + Math.round(pad.P * 40);
      this.lightness = 40 + Math.round(pad.A * 10);
      this.alpha = 0.6 + pad.D * 0.4;
      console.log('saturation:', this.saturation, 'lightness:', this.lightness, 'alpha:', this.alpha);

      this.setControlPoints(this.radius);

      TweenMax.to(this.emoShape, 0.5, {
        attr: {
          d: `M ${this.leftX} ${this.leftY} C
          ${this.cLRx1} ${this.cLRy1}, ${this.cLRx2} ${this.cLRy2}, ${this.rightX} ${this.rightY},
          ${this.cRMx1} ${this.cRMy1}, ${this.cRMx2} ${this.cRMy2}, ${this.midX} ${this.midY},
          ${this.cMLx1} ${this.cMLy1}, ${this.cMLx2} ${this.cMLy2}, ${this.leftX} ${this.leftY}
          `
        },
        fill: `hsla(0, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`
      });

    });

  }

  setControlPoints(r: number) {
    // const r = radius;
    console.log('setControlPoints r:', r);
    // control points for left to right curve
    this.cLRx1 = Math.round(this.leftX + polarToCartesianX(60, r));
    this.cLRy1 = Math.round(this.leftY - polarToCartesianY(60, r));
    this.cLRx2 = Math.round(this.rightX + polarToCartesianX(120, r));
    this.cLRy2 = Math.round(this.rightY - polarToCartesianY(120, r));
    // control points for right to mid curve
    this.cRMx1 = Math.round(this.rightX + polarToCartesianX(300, r));
    this.cRMy1 = Math.round(this.rightY - polarToCartesianY(300, r));
    this.cRMx2 = Math.round(this.midX + polarToCartesianX(360, r));
    this.cRMy2 = Math.round(this.midY - polarToCartesianY(360, r));
    // control points for mid to left curve
    this.cMLx1 = Math.round(this.midX + polarToCartesianX(180, r));
    this.cMLy1 = Math.round(this.midY - polarToCartesianY(180, r));
    this.cMLx2 = Math.round(this.leftX + polarToCartesianX(120, r));
    this.cMLy2 = Math.round(this.leftY + polarToCartesianY(120, r));
  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
    console.log('svg16 OnDestroy');
  }
}
