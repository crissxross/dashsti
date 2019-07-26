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

  waveSize = 50; // 100;
  startX = 0;
  startY = this.waveSize;
  // startY = 0;
  repeatWaves = 3;
  bottomX = this.waveSize;
  bottomY = this.waveSize;
  topX = this.waveSize;
  topY = -this.waveSize;
  // for control points
  radiusLeft: number;
  radiusRight: number;
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
    // fade in
    TweenMax.fromTo(this.emoLine, 0.75, {opacity: 0}, {opacity: 1, delay: 0.1});
  }

  ngOnChanges() {
    this.radiusLeft = (this.P + 1) * (this.waveSize * 0.5);
    this.radiusRight = this.waveSize - this.radiusLeft;
    // this.radiusLeft = (this.P + 1) * 50;
    // this.radiusRight = 100 - this.radiusLeft;

    // TODO: HSLA values maybe should use combined PAD values - e.g. saturation is a combination of P & A
    this.saturation = 60 + Math.round(this.P * 40);
    this.lightness = 40 + Math.round(this.A * 10);
    this.alpha = 0.7 + this.D * 0.3;

    this.setControlPoints(this.radiusLeft, this.radiusRight);
    this.drawPath();

    console.log('radtiusLeft:', this.radiusLeft, 'radtiusRight:', this.radiusRight, ', waveSize:', this.waveSize);
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
    // relative points (because lowercase 'c')
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
    this.cTBy1 = 0;
    this.cTBx2 = Math.round(this.bottomX + polarToCartesianX(180, rL));
    this.cTBy2 = Math.round(this.bottomY - polarToCartesianY(180, rL));

    // control points Bottom to Top S curve
    this.cBTx1 = Math.round(this.bottomX + polarToCartesianX(180, rR));
    this.cBTy1 = 0;
    this.cBTx2 = Math.round(this.topX + polarToCartesianX(180, rL));
    this.cBTy2 = Math.round(this.topY - polarToCartesianY(180, rL));

    // console.log(
    //   'control points: cTB', this.cTBx1, this.cTBy1, this.cTBx2, this.cTBy2, ', cBT', this.cBTx1, this.cBTy1, this.cBTx2, this.cBTy2
    //   );
  }

}
