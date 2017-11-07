import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/observable/combineLatest';
import { combineLatest } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { TweenMax, TimelineMax, Power1, Back } from 'gsap';
import * as CustomEase from 'gsap/CustomEase';
import * as CustomWiggle from 'gsap/CustomWiggle';
import { polarToCartesianX, polarToCartesianY } from '../../shared/utils';

@Component({
  selector: 'app-emoviz8',
  templateUrl: './emoviz8.component.html',
  styleUrls: ['../emoviz.css', './emoviz8.component.css']
})
export class Emoviz8Component implements OnInit, OnDestroy {
  // svg elements
  @ViewChild('boundingBox') boundingBox: ElementRef;
  @ViewChild('emoShape') emoShape: ElementRef;

  // PAD properties
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  PADprogress: Subscription;

  pNote: string;
  aNote: string;
  dNote: string;
  miscNote: string;

  constructor(private store: Store<fromRoot.State>) {
    this.pValue$ = store.select(state => state.pad.P);
    this.aValue$ = store.select(state => state.pad.A);
    this.dValue$ = store.select(state => state.pad.D);
   }

  ngOnInit() {
    const boundingBox = this.boundingBox.nativeElement;
    const emoShape = this.emoShape.nativeElement;

    // set default PAD 000 values of SVG elements to animate
    TweenMax.set(boundingBox, { fill: 'hsl(137, 30%, 80%)' });
    TweenMax.set(emoShape, { fill: 'hsl(0, 50%, 50%)' });
    // TweenMax.set(emoShape, { stroke: 'hsl(0, 80%, 70%)', strokeWidth: 2, fill: 'hsl(0, 50%, 50%)' });

    // PAD
    // combineLatest takes an optional mapping function (last) after input Observables
    // NOTE: combineLatest is used here as a static method of Observable class
    this.PADprogress = Observable.combineLatest(
      this.pValue$, this.aValue$, this.dValue$,
      (p, a, d) => ({ P: p, A: a, D: d })
    )
      .subscribe(pad => {
        console.log('Latest PAD:', pad.P, pad.A, pad.D);

        const topX = 150 + Math.round(pad.A * 10 ); // 140 to 160
        const topY = 90 + Math.round(pad.A * -50 ); // 140 to 40
        const rightX = 230 + Math.round(pad.D * 20 ); // 210 to 250
        const rightY = 180 + Math.round(pad.D * 50 ); // 130 to 230
        const leftX = 70 + Math.round(pad.D * -20 ); // 90 to 50
        const leftY = 180 + Math.round(pad.D * 50 ); // 130 to 230

        const topRadius = Math.round(50 + pad.P * 50); // 0 to 100
        const rightRadius = Math.round(45 + pad.P * 45); // 0 to 90
        const leftRadius = Math.round(45 + pad.P * 45); // 0 to 90

        // theta (angle) in degrees is converted to radians in polarToCartesianX/Y functions later
        const topTheta = Math.round(50 + pad.A * 50); // 0 to 100
        const rightTheta = Math.round(-50 + pad.A * -50); // 0 to -100
        const leftTheta = Math.round(50 + pad.A * 50); // 0 to 100

        // console.log('topTheta angle:', topTheta, 'rightTheta angle:', rightTheta, 'leftTheta angle:', leftTheta);
        // console.log('top:', topX, topY, 'right:', rightX, rightY, 'left:', leftX, leftY);

        const topCx1 = Math.round(topX + polarToCartesianX(topTheta, topRadius));
        const topCy1 = Math.round(topY + polarToCartesianY(topTheta, topRadius));
        const topCx2 = Math.round(topX - polarToCartesianX(topTheta, topRadius));
        const topCy2 = Math.round(topY - polarToCartesianY(topTheta, topRadius));
        const rightCx1 = Math.round(rightX + polarToCartesianX(rightTheta, rightRadius));
        const rightCy1 = Math.round(rightY + polarToCartesianY(rightTheta, rightRadius));
        const rightCx2 = Math.round(rightX - polarToCartesianX(rightTheta, rightRadius));
        const rightCy2 = Math.round(rightY - polarToCartesianY(rightTheta, rightRadius));
        const leftCx1 = Math.round(leftX + polarToCartesianX(leftTheta, leftRadius));
        const leftCy1 = Math.round(leftY + polarToCartesianY(leftTheta, leftRadius));
        const leftCx2 = Math.round(leftX - polarToCartesianX(leftTheta, leftRadius));
        const leftCy2 = Math.round(leftY - polarToCartesianY(leftTheta, leftRadius));

        // HSL Saturation & Lightness values for red & green hues
        const rS = 50 + Math.round(pad.P * 50);
        const rL = 40 + Math.round(pad.A * 30);
        const gS = 40 + Math.round(pad.D * 30);
        // const gL = 40 + Math.round(pad.D * 30);
        const gL = 15 + Math.round(pad.D * -10);
        console.log('rS:', rS, 'rL:', rL, 'gS:', gS, 'gL:', gL);

        TweenMax.to(emoShape, 0.5, {
          attr: {
            d: `M ${topX} ${topY} C
            ${topCx1} ${topCy1}, ${rightCx1} ${rightCy1}, ${rightX} ${rightY},
            ${rightCx2} ${rightCy2}, ${leftCx1} ${leftCy1}, ${leftX} ${leftY},
            ${leftCx2} ${leftCy2}, ${topCx2} ${topCy2}, ${topX} ${topY}
            `},
            fill: `hsl(0, ${rS}%, ${rL}%)`,
            ease: Power1.easeInOut
        });

        TweenMax.to(boundingBox, 0.5, {
            fill: `hsl(137, ${gS}%, ${gL}%)`
        });

      });

    // NOTES
    this.pNote = 'P: radius for each point';
    this.aNote = 'A: top vertex & angle of control points';
    this.dNote = 'D: right & left vertex positions';
    this.miscNote = 'this is using SVG';
  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
    console.log('emoviz8 OnDestroy');
  }

}
