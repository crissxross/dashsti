import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges } from '@angular/core';

import { TweenMax, Power1 } from 'gsap/TweenMax';
import { polarToCartesianX, polarToCartesianY } from '../../shared/utils';

@Component({
  selector: 'app-wavezz17',
  templateUrl: './wavezz17.component.svg',
  styleUrls: ['./wavezz17.component.css']
})
export class Wavezz17Component implements OnInit, OnChanges {
  @ViewChild('emoLine', {static: true}) _emoLine: ElementRef;

  // using getter method as in https://medium.com/@philipf5/patterns-for-using-greensock-in-angular-9ec5edf713fb
  get emoLine(): SVGPathElement {
    return this._emoLine.nativeElement;
  }

  startX = 10;
  startY = 100;
  waveSize = 100;
  repeatWaves = 1;
  bottomX = this.waveSize;
  bottomY = this.waveSize;
  topX = this.waveSize;
  topY = -this.waveSize;
  // for control points
  radiusLeft = 50;
  radiusRight = 100 - this.radiusLeft;
  cTBx1: number;
  cTBy1: number;
  cTBx2: number;
  cTBy2: number;
  cBTx1: number;
  cBTy1: number;
  cBTx2: number;
  cBTy2: number;
  saturation: number;
  lightness: number;
  alpha: number;
  // PAD
  @Input() P: number;
  @Input() A: number;
  @Input() D: number;

  constructor() { }

  ngOnInit() {
    // TweenMax.set(this.emoLine, {scale: 0.4});
    // fade in
    TweenMax.fromTo(this.emoLine, 0.75, {opacity: 0}, {opacity: 1, delay: 0.1});
  }

  ngOnChanges() {
    this.radiusLeft = this.P * 50;
    this.radiusRight = 100 - this.radiusLeft;
    // TODO: HSLA values maybe should use combined PAD values - e.g. saturation is a combination of P & A
    this.saturation = 60 + Math.round(this.P * 40);
    this.lightness = 40 + Math.round(this.A * 10);
    this.alpha = 0.7 + this.D * 0.3;

    console.log('radtiusLeft:', this.radiusLeft, 'radtiusRight:', this.radiusRight, ', waveSize:', this.waveSize);
    this.setControlPoints(this.radiusLeft, this.radiusRight);

    this.drawPath();
  }

  drawPath() {
    return TweenMax.to(this.emoLine, 0.5, {
      attr: {
        d: `M ${this.startX} ${this.startY}` + this.drawPoints(this.repeatWaves)
      },
      stroke: `hsla(100, ${this.saturation}%, ${this.lightness}%, ${this.alpha})`
    });
  }

  drawPoints(num: number) {
    // relative points
    let points = `c ${this.cTBx1} ${this.cTBy1}, ${this.cTBx2} ${this.cTBy2}, ${this.bottomX} ${this.bottomY},
    c ${this.cBTx1} ${this.cBTy1}, ${this.cBTx2} ${this.cBTy2}, ${this.topX} ${this.topY}`;
    for (let i = 0; i < num; i++) {
      points += points;
      console.log(i, 'points:', points);
    }
    return points;
  }

  setControlPoints(rL: number, rR: number) {
    // control points Top to Bottom S curve
    this.cTBx1 = Math.round(this.topX + polarToCartesianX(180, rR));
    // this.cTBy1 = Math.round(this.topY + polarToCartesianY(180, r));
    this.cTBy1 = 0;
    this.cTBx2 = Math.round(this.bottomX + polarToCartesianX(180, rL));
    this.cTBy2 = Math.round(this.bottomY - polarToCartesianY(180, rL));

    // control points Bottom to Top S curve
    this.cBTx1 = Math.round(this.bottomX + polarToCartesianX(180, rR));
    // this.cBTy1 = Math.round(this.bottomY + polarToCartesianY(180, r));
    this.cBTy1 = 0;
    this.cBTx2 = Math.round(this.topX + polarToCartesianX(180, rL));
    this.cBTy2 = Math.round(this.topY - polarToCartesianY(180, rL));

    // console.log(
    //   'control points: cTB', this.cTBx1, this.cTBy1, this.cTBx2, this.cTBy2, ', cBT', this.cBTx1, this.cBTy1, this.cBTx2, this.cBTy2
    //   );
  }

}
  // cBx1 = 50;
  // cBy1 = 0;
  // cBx2 = 50;
  // cBy2 = 100;
  // cTx1 = 50;
  // cTy1 = 0;
  // cTx2 = 50;
  // cTy2 = -100;

  // this.cBx1 = 50;
  // this.cBy1 = 0;
  // this.cBx2 = 50;
  // this.cBy2 = 100;
  // this.cTx1 = 50;
  // this.cTy1 = 0;
  // this.cTx2 = 50;
  // this.cTy2 = -100;

  // this.cBx1 = this.waveSize / 2;
  // this.cBy1 = this.waveSize - this.waveSize; // 0;
  // this.cBx2 = this.waveSize / 2;
  // this.cBy2 = this.waveSize;
  // this.cTx1 = this.waveSize / 2;
  // this.cTy1 = this.waveSize - this.waveSize; // 0;
  // this.cTx2 = this.waveSize / 2;
  // this.cTy2 = - this.waveSize;

// d: `M ${this.startX} ${this.startY}
        //   c ${this.cBx1} ${this.cBy1}, ${this.cBx2} ${this.cBy2}, ${this.bottomX} ${this.bottomY}
        //   c ${this.cTx1} ${this.cTy1}, ${this.cTx2} ${this.cTy2}, ${this.topX} ${this.topY}
        // `
