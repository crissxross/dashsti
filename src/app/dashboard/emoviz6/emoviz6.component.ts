import { Component, ElementRef, Input, OnInit, OnDestroy, Renderer, ViewChild } from '@angular/core'; // check version of Renderer !!!!!!!!!
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { TweenMax, TimelineMax, Power1, Back } from 'gsap';
import * as CustomEase from 'gsap/CustomEase';
import * as CustomWiggle from 'gsap/CustomWiggle';

@Component({
  selector: 'app-emoviz6',
  templateUrl: './emoviz6.component.html',
  styleUrls: ['../emoviz.css', './emoviz6.component.css']
})
export class Emoviz6Component implements OnInit, OnDestroy {
  @ViewChild('canvas') canvasRef: ElementRef;

  // PAD properties
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  PADprogress: Subscription;

  pLength;
  aLength;
  dLength;

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

    this.drawDiamond(ctx, 47, 10, 75, 100, '#800000'); // red

    // PAD
    // combineLatest takes an optional mapping function (last) after input Observables
    this.PADprogress = Observable.combineLatest(
      this.pValue$, this.aValue$, this.dValue$,
      (p, a, d) => ({ P: p, A: a, D: d })
    )
      .subscribe(pad => {
        // console.log('Latest PAD values P:', pad.P, ' A:', pad.A, ' D:', pad.D);
        console.log('Latest PAD:', pad.P, pad.A, pad.D);

        this.pLength = Math.round( 10 + (pad.P + 1) * 50);
        this.aLength = Math.round( 10 + (pad.A + 1) * 40);
        this.dLength = Math.round( 100 + (pad.D + 1) * 25);

        this.drawDiamond(ctx, this.dLength, this.dLength, this.pLength, this.aLength, '#20803B'); // green
      });

    // NOTES
    this.pNote = 'P: ???';
    this.aNote = 'A: ???';
    this.dNote = 'D: ???';
    this.miscNote = 'This uses CANVAS';
  }

  drawDiamond(ctx, x, y, width, height, colour) {
    ctx.save();
    ctx.beginPath();
    ctx.globalAlpha = 0.1;
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
    ctx.restore();
  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
    // console.log('emoviz6 OnDestroy');
  }

}
