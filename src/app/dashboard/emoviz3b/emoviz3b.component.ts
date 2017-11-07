import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { TweenMax, TimelineMax, Power1, Back } from 'gsap';
import * as CustomEase from 'gsap/CustomEase';
import * as CustomWiggle from 'gsap/CustomWiggle';

@Component({
  selector: 'app-emoviz3b',
  templateUrl: './emoviz3b.component.html',
  styleUrls: ['../emoviz.css', './emoviz3b.component.css']
})
export class Emoviz3bComponent implements OnInit, OnDestroy {
  // svg elements
  @ViewChild('bg') bg: ElementRef;
  @ViewChild('emoLine') emoLine: ElementRef;
  @ViewChild('emoZZ') emoZZ: ElementRef;
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
    const emoLine = this.emoLine.nativeElement;
    // const emoZZ = this.emoZZ.nativeElement;

    // set default PAD 000 values of SVG elements to animate
    TweenMax.set(bg, { fill: 'hsl(137, 30%, 10%)' });
    TweenMax.set(emoLine, { x: '-=25', stroke: 'hsl(0, 50%, 50%)', strokeWidth: 2, fill: 'none' });
    // Note: GSAP shorthand for transform properties: x, y, z, scale, rotation

    // PAD
    // combineLatest takes an optional mapping function (last) after input Observables
    // NOTE: combineLatest is used here as a static method of Observable class
    this.PADprogress = Observable.combineLatest(
      this.pValue$, this.aValue$, this.dValue$,
      (p, a, d) => ({ P: p, A: a, D: d })
    )
      .subscribe(pad => {
        // console.log('Latest PAD values P:', pad.P, ' A:', pad.A, ' D:', pad.D);
        console.log('Latest PAD:', pad.P, pad.A, pad.D);
        // bezier control points and points of line
        const x1_ = Math.round((pad.P + 1) * 12.5); // P range from 0 to 25 //OK-P;
        const x1__ = Math.round(50 - (pad.P + 1) * 12.5); // P range from 50 to 25 //OK-P;
        const y1_ = 0; // OK-P
        // y1__ is affected by both P & A scales
        // y1__ A should range from 0 to 50, but P is opposite !!!
        // y1__ P range from 50 to 0
        // ?? combine A value with P somehow, maybe by checking if A or P is neg/pos ?
        const y1__ = (Math.round(50 - (pad.P + 1) * 25)); // P range from 50 to 0; //OK-P notOK-A
        const x2_ = Math.round(50 - (pad.P + 1) * 12.5); // P range from 50 to 25 //OK-P;
        const x2__ = Math.round(50 - (pad.P + 1) * 12.5); // P range from 50 to 25 //OK-P;
        const y2_ = Math.round((pad.A + 1) * 25); // A range from 0 to 50; //OK-A
        const y2__ = Math.round((pad.A + 1) * 25); // A range from 0 to 50; //OK-A
        // x y positions
        const x_ = 50;
        const x__ = 50;
        const y_ = Math.round((pad.A + 1) * 25); // A range from 0 to 50; //OK-A
        const y__ = Math.round((pad.A + 1) * 25); // A range from 0 to 50; //OK-A

        // other visual attributes of line
        const P_S = 50 + pad.P * 50; // range from 0 to 100
        const P_L = 50 + pad.P * 25; // ranges from 25 to 75
        const DstrokeW = 11 + pad.D * 10; // range from 1 to 21
        const Dscale = (1 + pad.D); // range from 0 to 2
        // const Dopacity = (1.5 + pad.D) / 2; // range from 0 to 1

        TweenMax.to(emoLine, 0.5, {
          attr: {
            d: `M 0 200 c
              ${x1_} ${y1_}, ${x2_} -${y2_}, ${x_} -${y_}
              ${x1__} ${y1__}, ${x2__} ${y2__}, ${x__} ${y__}
              ${x1_} ${y1_}, ${x2_} -${y2_}, ${x_} -${y_}
              ${x1__} ${y1__}, ${x2__} ${y2__}, ${x__} ${y__}
              ${x1_} ${y1_}, ${x2_} -${y2_}, ${x_} -${y_}
              ${x1__} ${y1__}, ${x2__} ${y2__}, ${x__} ${y__}
              ${x1_} ${y1_}, ${x2_} -${y2_}, ${x_} -${y_}
              ${x1__} ${y1__}, ${x2__} ${y2__}, ${x__} ${y__}
            ` },
          strokeWidth: DstrokeW,
          stroke: `hsl(0, ${P_S}%, ${P_L}%)`,
          opacity: 1, // PposOpacity,
          scale: Dscale,
          ease:  Power1.easeInOut
        });

        console.log('x1_', x1_, '| x1__', x1__, '| x2_', x2_, '| x2__', x2__, '| y1_', y1_, '| y1__', y1__, '| y2_', y2_, '| y2__', y2__);

        // console.log(' DstrokeW:', DstrokeW, 'P_S:', P_S, ' P_L:', P_L, 'Dscale:', Dscale);
      });

    // NOTES
    this.pNote = 'P: varies curvy/angular, saturation & brightness of line.';
    this.aNote = 'A: varies amplitude of line.';
    this.dNote = 'D: varies stroke width & scale of line.';
    this.miscNote = '(P curvy/angular is a hack)';
  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
    // console.log('emoviz3a OnDestroy');
  }

}

