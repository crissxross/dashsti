import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { Store, select } from '@ngrx/store';
// import * as PadActions from '../../pad-actions';
import * as fromPad from '../../reducers';

@Component({
  selector: 'app-emoviz6',
  templateUrl: './emoviz6.component.html',
  styleUrls: ['../emoviz.css', './emoviz6.component.css']
})
export class Emoviz6Component implements OnInit, OnDestroy {
  @ViewChild('canvas', {static: true}) canvasRef: ElementRef;

  // PAD properties
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  PADprogress: Subscription;
  // pLength: number;
  // aLength: number;
  // dLength: number;

  pNote: string;
  aNote: string;
  dNote: string;
  miscNote: string;

  constructor(private store: Store<fromPad.State>) {
    this.pValue$ = store.pipe(select(fromPad.getP));
    this.aValue$ = store.pipe(select(fromPad.getA));
    this.dValue$ = store.pipe(select(fromPad.getD));
  }

  ngOnInit() {
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');
    // control shapes for reference
    this.drawDiamond(ctx, 20, 298, 30, 30, 1, '#800000'); // red
    this.drawTriangle(ctx, 50, 295, 20, 30, -20, 30, 1, '#20803B');
    this.drawEllipse(ctx, 90, 300, 20, 25, 1, '#20803B');
    this.drawBlob(ctx, 150, 150, 50, 50, 20, 20, -20, 20, 1, '#800');
    this.drawHeart(ctx, 75, 40, 0.4, '#800000');

    // PAD
    // combineLatest takes an optional ng function (last) after input Observables
    // NOTE: combineLatest is used here as a static method of Observable class
    this.PADprogress = combineLatest(
      this.pValue$, this.aValue$, this.dValue$,
      (p, a, d) => ({ P: p, A: a, D: d })
    )
      .subscribe(pad => {
        // console.log('Latest PAD values P:', pad.P, ' A:', pad.A, ' D:', pad.D);
        console.log('Latest PAD:', pad.P, pad.A, pad.D);

        const pLength = Math.round( 55 + pad.P * 50);
        const aLength = Math.round( 75 + pad.A * 50);
        const dLength = Math.round(100 + pad.D * 50);
        const xD = Math.round(300 + pad.D * 25);
        const yD = Math.round(30 + pad.D * 25);
        const centreXD = Math.round(300 + pad.D * 25);
        const centreYD = Math.round(90 + pad.D * 25);
        const alpha = 0.2; // pad.D;

        this.drawDiamond(ctx, xD, yD, pLength, aLength, alpha, '#800'); // < red, green: #20803B
        this.drawEllipse(ctx, centreXD, centreYD, pLength, aLength, alpha, '#20803B');

        console.log('pLength', pLength, 'aLength', aLength, 'dLength', dLength);
        console.log('xD', xD, 'yD', yD); // , 'alpha(D)', alpha);
      });

  // NOTES
    this.pNote = 'P: ???';
    this.aNote = 'A: ???';
    this.dNote = 'D: ???';
    this.miscNote = 'This uses CANVAS';
  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
    console.log('emoviz6 OnDestroy');
  }

  // *************** DRAWING FUNCTIONS ***************

  // copied from HTML5 Canvas Cookbook (Ch2, playing card suits)
  drawDiamond(ctx, x, y, width, height, alpha, colour) {
    // ctx.save();
    ctx.beginPath();
    ctx.globalAlpha = alpha;
    ctx.moveTo(x, y);
    // top left edge
    ctx.lineTo(x - width / 2, y + height / 2);
    // bottom left edge
    ctx.lineTo(x, y + height);
    // bottom right edge
    ctx.lineTo(x + width / 2, y + height / 2);
    // closing the path automatically creates
    // the top right edge
    ctx.closePath();
    ctx.fillStyle = colour;
    ctx.fill();
    // ctx.restore();
  }

  drawTriangle(ctx, x, y, x1, y1, x2, y2, alpha, colour) {
    ctx.beginPath();
    ctx.globalAlpha = alpha;
    ctx.moveTo(x, y);
    ctx.lineTo(x + x1, y + y1);
    ctx.lineTo(x + x2, y + y2);
    ctx.closePath();
    ctx.fillStyle = colour;
    ctx.fill();
  }

  drawEllipse(ctx, centreX, centreY, halfWidth, halfHeight, alpha, colour) {
    ctx.beginPath();
    ctx.globalAlpha = alpha;
    ctx.moveTo(centreX, centreY - halfHeight);
    ctx.bezierCurveTo(
      centreX + halfWidth, centreY - halfHeight, // cp1
      centreX + halfWidth, centreY + halfHeight, // cp2
      centreX, centreY + halfHeight
    );
    ctx.bezierCurveTo(
      centreX - halfWidth, centreY + halfHeight, // cp3
      centreX - halfWidth, centreY - halfHeight, // cp4
      centreX, centreY - halfHeight
    );
    // ctx.closePath();
    ctx.fillStyle = colour;
    ctx.fill();
  }

  drawBlob(ctx, centreX, centreY, halfWidth, halfHeight, x1, y1, x2, y2, alpha, colour) {
    ctx.beginPath();
    ctx.globalAlpha = alpha;
    ctx.moveTo(centreX, centreY - halfHeight);
    ctx.bezierCurveTo(
      centreX + halfWidth + x1, centreY - halfHeight - y1, // cp
      centreX + halfWidth + x2, centreY + halfHeight + y2, // cp
      centreX, centreY + halfHeight
    );
    ctx.bezierCurveTo(
      centreX - halfWidth - x2, centreY + halfHeight + y2, // cp
      centreX - halfWidth - x1, centreY - halfHeight - y1, // cp
      centreX, centreY - halfHeight
    );
    // ctx.closePath();
    ctx.fillStyle = colour;
    ctx.fill();
  }

  drawHeart(ctx, x, y, alpha, colour) {
    ctx.beginPath();
    ctx.globalAlpha = alpha;
    ctx.moveTo(x, y); // 75, 40
    ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
    ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
    ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
    ctx.bezierCurveTo(110, 102, 130, 80, 130, 62.5);
    ctx.bezierCurveTo(130, 62.5, 130, 25, 100, 25);
    ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
    ctx.fillStyle = colour;
    ctx.fill();
  }

}
