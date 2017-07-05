import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { TweenMax, TimelineMax, Back } from 'gsap';
import * as CustomEase from 'gsap/CustomEase';
import * as CustomWiggle from 'gsap/CustomWiggle';
import * as MorphSVG from 'gsap/MorphSVGPlugin';

@Component({
  selector: 'app-emoviz4',
  templateUrl: './emoviz4.component.html',
  styleUrls: ['../emoviz.css', './emoviz4.component.css']
})
export class Emoviz4Component implements OnInit, OnDestroy {
  // svg elements
  @ViewChild('bg') bg: ElementRef;
  @ViewChild('Plines') Plines: ElementRef;
  @ViewChild('Alines') Alines: ElementRef;
  @ViewChild('P_') P_: ElementRef;
  @ViewChild('Ppos1') Ppos1: ElementRef;
  @ViewChild('Ppos2') Ppos2: ElementRef;
  @ViewChild('Pneg1') Pneg1: ElementRef;
  @ViewChild('Pneg2') Pneg2: ElementRef;
  @ViewChild('A_') A_: ElementRef;
  @ViewChild('Apos1') Apos1: ElementRef;
  @ViewChild('Aneg1') Aneg1: ElementRef;

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
    const bg = this.bg.nativeElement;
    const Plines = this.Plines.nativeElement;
    const Alines = this.Alines.nativeElement;
    const P_ = this.P_.nativeElement;
    const Ppos1 = this.Ppos1.nativeElement;
    const Ppos2 = this.Ppos2.nativeElement;
    const Pneg1 = this.Pneg1.nativeElement;
    const Pneg2 = this.Pneg2.nativeElement;
    const A_ = this.A_.nativeElement;
    const Apos1 = this.Apos1.nativeElement;
    const Aneg1 = this.Aneg1.nativeElement;

    const tlP = new TimelineMax({ paused: false });
    const tlA = new TimelineMax({ paused: true });
    const tlD = new TimelineMax({ paused: true });

    // set default PAD 000 values of SVG elements to animate
    TweenMax.set(bg, { fill: 'hsl(137, 30%, 10%)' });
    TweenMax.set(Plines, { x: 100, y: 0 });
    TweenMax.set(Alines, { x: 100, y: 120 });
    TweenMax.set([Ppos1, Ppos2, Pneg1, Pneg2, Apos1, Aneg1], { visibility: 'hidden' });
    // Note: GSAP shorthand for transform properties: x, y, z, scale, rotation

    // PAD
    // combineLatest takes an optional mapping function (last) after input Observables
    this.PADprogress = Observable.combineLatest(
      this.pValue$, this.aValue$, this.dValue$,
      (p, a, d) => ({ P: p, A: a, D: d })
    )
      .subscribe(pad => {
        console.log('Latest PAD values P:', pad.P, ' A:', pad.A, ' D:', pad.D);
        // console.log('Latest PAD:', pad);
      });

    tlP.to(P_, 1, { morphSVG: Ppos1, ease: Back.easeOut.config(2) }, '+=0.1')
      .to(P_, 1, { morphSVG: Ppos2, ease: Back.easeOut.config(2) }, '+=0.1')
      .to(P_, 1, { morphSVG: Pneg1, ease: Back.easeOut.config(2) }, '+=0.1')
      .to(P_, 1, { morphSVG: Pneg2, ease: Back.easeOut.config(2) }, '+=0.1');

    // NOTES
    this.pNote = 'P: timeline position -- ??';
    this.aNote = 'A: timeline position -- ??';
    this.dNote = 'D: timeline position -- ??';
    this.miscNote = 'CHANGE THIS !!!!';

  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
  }

}
// Try mapping PAD values to timeline labels?
// Then use tl.pause(PADvalue);
// see: https://greensock.com/docs/#/HTML5/GSAP/TimelineMax/pause/
