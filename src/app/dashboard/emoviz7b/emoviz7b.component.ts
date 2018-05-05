import {
  Component,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  Renderer2,
  ViewChild
} from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { TweenMax } from 'gsap';

@Component({
  selector: 'app-emoviz7b',
  templateUrl: './emoviz7b.component.html',
  styleUrls: ['../emoviz.css', './emoviz7b.component.css']
})
export class Emoviz7bComponent implements OnInit, OnDestroy {
  @ViewChild('canvas') canvasRef: ElementRef;
  private running: boolean;

  // PAD properties
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  PADprogress: Subscription;

  // CANVAS shape/drawing properties
  topX: number;
  topY: number;
  rightX: number;
  rightY: number;
  leftX: number;
  leftY: number;
  topRadius: number;
  rightRadius: number;
  leftRadius: number;
  topTheta: number;
  rightTheta: number;
  leftTheta: number;
  topCx1: number;
  topCy1: number;
  topCx2: number;
  topCy2: number;
  rightCx1: number;
  rightCy1: number;
  rightCx2: number;
  rightCy2: number;
  leftCx1: number;
  leftCy1: number;
  leftCx2: number;
  leftCy2: number;
  points;
  rS: number;
  rL: number;
  gS: number;
  gL: number;
  spot = { x: 200, y: 50, radius: 10 }; // for TESTING

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
    // only animate if running is true
    this.running = true;
    console.log('running:', this.running);

    // NOTE: combineLatest is used here as a static method of Observable class
    this.PADprogress = combineLatest(this.pValue$, this.aValue$, this.dValue$, (p, a, d) => ({
      P: p,
      A: a,
      D: d
    })).subscribe(pad => {
      // console.log('Latest PAD values P:', pad.P, ' A:', pad.A, ' D:', pad.D);
      // console.log('Latest PAD:', pad.P, pad.A, pad.D);

      // CANVAS (300x300) drawing properties
      this.topX = 150 + Math.round(pad.A * 10); // 140 to 160
      this.topY = 90 + Math.round(pad.A * -50); // 140 to 40
      this.rightX = 230 + Math.round(pad.D * 20); // 210 to 250
      this.rightY = 180 + Math.round(pad.D * 50); // 130 to 230
      this.leftX = 70 + Math.round(pad.D * -20); // 90 to 50
      this.leftY = 180 + Math.round(pad.D * 50); // 130 to 230

      this.topRadius = Math.round(50 + pad.P * 50); // 0 to 100
      this.rightRadius = Math.round(45 + pad.P * 45); // 0 to 90
      this.leftRadius = Math.round(45 + pad.P * 45); // 0 to 90

      // theta (angle) in degrees is converted to radians in polarToCartesianX/Y later
      this.topTheta = Math.round(50 + pad.A * 50); // 0 to 100
      this.rightTheta = Math.round(-50 + pad.A * -50); // 0 to -100
      this.leftTheta = Math.round(50 + pad.A * 50); // 0 to 100

      // console.log('topTheta angle:', topTheta, 'rightTheta angle:', rightTheta, 'leftTheta angle:', leftTheta);
      // console.log('top:', topX, topY, 'right:', rightX, rightY, 'left:', leftX, leftY);

      this.topCx1 = Math.round(this.topX + this.polarToCartesianX(this.topTheta, this.topRadius));
      this.topCy1 = Math.round(this.topY + this.polarToCartesianY(this.topTheta, this.topRadius));
      this.topCx2 = Math.round(this.topX - this.polarToCartesianX(this.topTheta, this.topRadius));
      this.topCy2 = Math.round(this.topY - this.polarToCartesianY(this.topTheta, this.topRadius));
      this.rightCx1 = Math.round(
        this.rightX + this.polarToCartesianX(this.rightTheta, this.rightRadius)
      );
      this.rightCy1 = Math.round(
        this.rightY + this.polarToCartesianY(this.rightTheta, this.rightRadius)
      );
      this.rightCx2 = Math.round(
        this.rightX - this.polarToCartesianX(this.rightTheta, this.rightRadius)
      );
      this.rightCy2 = Math.round(
        this.rightY - this.polarToCartesianY(this.rightTheta, this.rightRadius)
      );
      this.leftCx1 = Math.round(
        this.leftX + this.polarToCartesianX(this.leftTheta, this.leftRadius)
      );
      this.leftCy1 = Math.round(
        this.leftY + this.polarToCartesianY(this.leftTheta, this.leftRadius)
      );
      this.leftCx2 = Math.round(
        this.leftX - this.polarToCartesianX(this.leftTheta, this.leftRadius)
      );
      this.leftCy2 = Math.round(
        this.leftY - this.polarToCartesianY(this.leftTheta, this.leftRadius)
      );

      // points for drawing bezier curved shape, clockwise starting from top vertex (spot)
      this.points = [
        { x: this.topX, y: this.topY },
        { x: this.topCx1, y: this.topCy1 },
        { x: this.rightCx1, y: this.rightCy1 },
        { x: this.rightX, y: this.rightY },
        { x: this.rightCx2, y: this.rightCy2 },
        { x: this.leftCx1, y: this.leftCy1 },
        { x: this.leftX, y: this.leftY },
        { x: this.leftCx2, y: this.leftCy2 },
        { x: this.topCx2, y: this.topCy2 },
        { x: this.topX, y: this.topY }
      ];

      // HSL Saturation & Lightness values for red & green hues
      this.rS = 50 + Math.round(pad.P * 50);
      this.rL = 40 + Math.round(pad.A * 30);
      this.gS = 40 + Math.round(pad.D * 30);
      this.gL = 15 + Math.round(pad.D * -10);
      // console.log('rS:', this.rS, 'rL:', this.rL, 'gS:', this.gS, 'gL:', this.gL);
    });

    // tween spot for TESTING
    TweenMax.to(this.spot, 2, { x: 250, y: 100, radius: 20, repeat: -1, yoyo: true });

    // start the rendering loop (for animation)
    this.render();
    // TweenMax.ticker.addEventListener('tick', this.render);

    // NOTES
    this.pNote = 'P: radius length for each point';
    this.aNote = 'A: top vertex position & angle of control points';
    this.dNote = 'D: right & left vertex positions';
    this.miscNote = 'This uses CANVAS';
  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
    this.running = false;
    console.log('emoviz7a OnDestroy, running:', this.running);
  }

  // ******** RENDER LOOP for animation *******************

  private render() {
    // check whether still running
    if (!this.running) {
      return;
    }

    // render current frame
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    ctx.globalAlpha = 0.1;
    ctx.fillStyle = `hsl(137, ${this.gS}%, ${this.gL}%)`;
    ctx.fillRect(0, 0, 300, 300);
    // this.drawControlPoints(ctx, this.points);
    this.drawTriShape(ctx, this.points, this.rS, this.rL);
    this.drawSpot(ctx, this.spot.x, this.spot.y, this.spot.radius); // for TESTING

    // schedule next
    requestAnimationFrame(() => this.render());
  }

  // ******** CANVAS DRAWING methods & UTILITIES **************

  // DRAW BEZIER CURVE shape *****************
  drawTriShape(ctx: CanvasRenderingContext2D, points, rS: number, rL: number) {
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < 9; i += 3) {
      ctx.bezierCurveTo(
        points[i].x,
        points[i].y,
        points[i + 1].x,
        points[i + 1].y,
        points[i + 2].x,
        points[i + 2].y
      );
    }
    ctx.fillStyle = `hsla(0, ${rS}%, ${rL}%, 0.2)`;
    ctx.fill();
    ctx.lineWidth = 2;
    // ctx.strokeStyle = 'black';
    // ctx.stroke();
  }

  drawControlPoints(ctx: CanvasRenderingContext2D, points) {
    ctx.globalAlpha = 0.2;
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#880000';
    for (let i = 0; i < 9; i++) {
      // draw guide line strokes
      if (i % 3 !== 1) {
        ctx.beginPath();
        ctx.moveTo(points[i].x + 0.5, points[i].y + 0.5);
        ctx.lineTo(points[i + 1].x + 0.5, points[i + 1].y + 0.5);
        ctx.stroke();
      }
    }
    for (let i = 0; i < 9; i++) {
      // draw points & control points
      if (i % 3 === 0) {
        ctx.fillStyle = 'black';
        this.drawSpot(ctx, points[i].x, points[i].y, 5);
      } else {
        ctx.fillStyle = 'blue';
        ctx.fillRect(points[i].x - 5, points[i].y - 5, 10, 10);
      }
    }
  }

  drawSpot(ctx: CanvasRenderingContext2D, x, y, radius) {
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
    return Math.PI * angleInDegrees / 180;
  }
}
