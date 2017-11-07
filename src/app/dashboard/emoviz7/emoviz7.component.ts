import { Component, ElementRef, Input, OnInit, OnDestroy, Renderer, ViewChild } from '@angular/core'; // check version of Renderer !!!!!!!!!
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';
// import { map, combineLatest } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { TweenMax, TimelineMax, Power1, Back } from 'gsap';
import * as CustomEase from 'gsap/CustomEase';
import * as CustomWiggle from 'gsap/CustomWiggle';

@Component({
  selector: 'app-emoviz7',
  templateUrl: './emoviz7.component.html',
  styleUrls: ['../emoviz.css', './emoviz7.component.css']
})
export class Emoviz7Component implements OnInit, OnDestroy {
  @ViewChild('canvas') canvasRef: ElementRef;

  // PAD properties
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  PADprogress: Subscription;

  // Notes
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
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    this.PADprogress = Observable.combineLatest(
      this.pValue$, this.aValue$, this.dValue$,
      (p, a, d) => ({ P: p, A: a, D: d })
    )
      .subscribe(pad => {
        // console.log('Latest PAD values P:', pad.P, ' A:', pad.A, ' D:', pad.D);
        console.log('Latest PAD:', pad.P, pad.A, pad.D);

      // CANVAS (300x300) drawing properties
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

        console.log('topTheta angle:', topTheta, 'rightTheta angle:', rightTheta, 'leftTheta angle:', leftTheta);
        console.log('top:', topX, topY, 'right:', rightX, rightY, 'left:', leftX, leftY);

        const topCx1 = Math.round(topX + this.polarToCartesianX(topTheta, topRadius));
        const topCy1 = Math.round(topY + this.polarToCartesianY(topTheta, topRadius));
        const topCx2 = Math.round(topX - this.polarToCartesianX(topTheta, topRadius));
        const topCy2 = Math.round(topY - this.polarToCartesianY(topTheta, topRadius));
        const rightCx1 = Math.round(rightX + this.polarToCartesianX(rightTheta, rightRadius));
        const rightCy1 = Math.round(rightY + this.polarToCartesianY(rightTheta, rightRadius));
        const rightCx2 = Math.round(rightX - this.polarToCartesianX(rightTheta, rightRadius));
        const rightCy2 = Math.round(rightY - this.polarToCartesianY(rightTheta, rightRadius));
        const leftCx1 = Math.round(leftX + this.polarToCartesianX(leftTheta, leftRadius));
        const leftCy1 = Math.round(leftY + this.polarToCartesianY(leftTheta, leftRadius));
        const leftCx2 = Math.round(leftX - this.polarToCartesianX(leftTheta, leftRadius));
        const leftCy2 = Math.round(leftY - this.polarToCartesianY(leftTheta, leftRadius));

        // points for drawing bezier curved shape, clockwise starting from top vertex (spot)
        const points = [
          {x: topX, y: topY},
          {x: topCx1, y: topCy1}, {x: rightCx1, y: rightCy1}, {x: rightX, y: rightY},
          {x: rightCx2, y: rightCy2}, {x: leftCx1, y: leftCy1}, {x: leftX, y: leftY},
          {x: leftCx2, y: leftCy2}, {x: topCx2, y: topCy2}, {x: topX, y: topY}
        ];

        this.draw(ctx, points);
      });

    // NOTES
    this.pNote = 'P: radius length for each point';
    this.aNote = 'A: top vertex position & angle of control points';
    this.dNote = 'D: right & left vertex positions';
    this.miscNote = 'This uses CANVAS';
  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
    console.log('emoviz7 OnDestroy');
  }

  // *************** CANVAS DRAWING methods & UTILITIES **************

  // DRAW all canvas
  draw(ctx, points) {
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 300, 300);
    this.drawControlPoints(ctx, points);
    this.drawTriShape(ctx, points);
  }

  // Draw BEZIER CURVE shape *****************
  drawTriShape(ctx, points) {
  ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < 9; i += 3) {
        ctx.bezierCurveTo(points[i].x, points[i].y,
                          points[i + 1].x, points[i + 1].y,
                          points[i + 2].x, points[i + 2].y);
    }
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'black';
    ctx.stroke();
    // console.log('points', points);
  }

  drawControlPoints(ctx, points) {
  ctx.globalAlpha = 0.2;
  ctx.lineWidth = 1;
  ctx.strokeStyle = '#880000';
    for (let i = 0; i < 9; i++) { // draw guide line strokes
      if (i % 3 !== 1) {
        ctx.beginPath();
        ctx.moveTo( points[i].x + .5, points[i].y + .5 );
        ctx.lineTo( points[i + 1].x + .5, points[i + 1].y + .5 );
        ctx.stroke();
      }
    }
    for (let i = 0; i < 9; i++) { // draw points & control points
      if ( i % 3 === 0 ) {
        ctx.fillStyle = 'black';
        this.drawSpot(ctx, points[i].x, points[i].y, 5);
      } else {
        ctx.fillStyle = 'blue';
        ctx.fillRect(points[i].x - 5, points[i].y - 5, 10, 10);
      }
    }
  }

  drawSpot( ctx, x, y, radius ) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
  }

  // ********** UTILITY methods ********

  // converts control point x from polar to Cartesian x coordinate
  polarToCartesianX(theta, r) {
    const x = r * Math.cos(this.degreesToRadians(theta));
    // console.log('polarToCartesianX: ', x);
    return x;
  }

  // converts control point y from polar to Cartesian y coordinate
  polarToCartesianY(theta, r) {
    const y = r * Math.sin(this.degreesToRadians(theta));
    // console.log('polarToCartesianY: ', y);
    return y;
  }

  degreesToRadians(angleInDegrees) {
    return (Math.PI * angleInDegrees) / 180;
  }

}
