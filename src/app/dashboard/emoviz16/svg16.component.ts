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

  viewportWidth = 200;
  viewportHeight = 200;
  cx = this.viewportWidth / 2;
  cy = this.viewportHeight / 2;
  sideLength = 100;
  // calculate height of equilateral triangle (see myNOTES)
  triHeight = Math.round(this.sideLength * Math.sqrt(3) / 2) ;
  r = 45; // control points radius, 45 gives perfect circle
  leftX = this.cx - this.sideLength / 2;
  leftY = this.cy - this.triHeight / 2;
  rightX = this.cx + this.sideLength / 2;
  rightY = this.leftY; // this.cy - this.triHeight / 2;
  midX = this.cx;
  midY = this.cy + this.triHeight / 2;
  // control points for left to right curve
  cLRx1 = Math.round(this.leftX + polarToCartesianX(60, this.r)); // 125
  cLRy1 = Math.round(this.leftY - polarToCartesianY(60, this.r)); // 65
  cLRx2 = Math.round(this.rightX + polarToCartesianX(120, this.r)); // 175
  cLRy2 = Math.round(this.rightY - polarToCartesianY(120, this.r)); // 65
  // control points for right to mid curve
  cRMx1 = Math.round(this.rightX + polarToCartesianX(300, this.r)); // 230;
  cRMy1 = Math.round(this.rightY - polarToCartesianY(300, this.r)); // 150;
  cRMx2 = Math.round(this.midX + polarToCartesianX(360, this.r)); // 200;
  cRMy2 = Math.round(this.midY - polarToCartesianY(360, this.r)); // 200;
  // control points for mid to left curve
  cMLx1 = Math.round(this.midX + polarToCartesianX(180, this.r)); // 100;
  cMLy1 = Math.round(this.midY - polarToCartesianY(180, this.r)); // 200;
  cMLx2 = Math.round(this.leftX + polarToCartesianX(120, this.r)); // 70;
  cMLy2 = Math.round(this.leftY + polarToCartesianY(120, this.r)); // 150;

  pValue$: Observable<number>;
  pSubscription: Subscription;

  constructor(private store: Store<fromPad.State>) {
    this.pValue$ = store.pipe(select(fromPad.getP));
  }

  ngOnInit() {
    console.log('sideLength:', this.sideLength, 'triHeight:', this.triHeight);

    this.pSubscription = this.pValue$.subscribe(p => {
      console.log('Latest P value:', p);

      this.r = Math.round(p * 40);
      console.log('Latest r:', this.r);

      TweenMax.set(this.emoShape, { fill: 'hsla(60, 50%, 50%, 0.25)', stroke: 'hsla(60, 50%, 50%, 0.5)' });

      TweenMax.to(this.emoShape, 1, {
        attr: {
          d: `M ${this.leftX} ${this.leftY}
          C ${this.cLRx1}, ${this.cLRy1}, ${this.cLRx2}, ${this.cLRy2}, ${this.rightX} ${this.rightY},
          C ${this.cRMx1}, ${this.cRMy1}, ${this.cRMx2}, ${this.cRMy2}, ${this.midX} ${this.midY},
          C ${this.cMLx1}, ${this.cMLy1}, ${this.cMLx2}, ${this.cMLy2}, ${this.leftX} ${this.leftY},
          `
        }
      });

    });

  }

  ngOnDestroy() {
    this.pSubscription.unsubscribe();
    console.log('svg16 OnDestroy');
  }

}
