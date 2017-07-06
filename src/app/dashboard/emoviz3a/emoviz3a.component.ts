import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
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
  selector: 'app-emoviz3a',
  templateUrl: './emoviz3a.component.html',
  styleUrls: ['../emoviz.css', './emoviz3a.component.css']
})
export class Emoviz3aComponent implements OnInit, OnDestroy {
  // svg elements
  @ViewChild('bg') bg: ElementRef;
  @ViewChild('emoLine') emoLine: ElementRef;
  @ViewChild('guide') guide: ElementRef;
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
    const guide = this.guide.nativeElement;

    // set default PAD 000 values of SVG elements to animate
    TweenMax.set(bg, { fill: 'hsl(137, 30%, 10%)' });
    TweenMax.set(emoLine, { stroke: 'hsl(0, 50%, 50%)', strokeWidth: 2, fill: 'none' });
    TweenMax.set(guide, { stroke: 'hsl(137, 10%, 70%)', fill: 'none', opacity: 0.5, });
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
        const P_S = 50 + pad.P * 50; // range from 0 to 100
        const Pdx1 = 25;
        const Pdx2 = 25;
        const Ady1 = Math.round((pad.A + 1) * 30); // range from 0 to 60;
        const Ady2 = Math.round((pad.A + 1) * 30); // range from 0 to 60;
        const DstrokeW = 11 + pad.D * 10; // range from 1 to 21
        const Dopacity = (1.5 + pad.D) / 2; // range from 0 to 1
        const Dscale = (1 + pad.D); // range from 0 to 2

        TweenMax.to(emoLine, 0.5, {
          attr: {
            d: `M -10 100
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
              c ${Pdx1} -${Ady1}, ${Pdx2} -${Ady2}, 50 0
              c ${Pdx1} ${Ady1}, ${Pdx2} ${Ady2}, 50 0
            ` },
          strokeWidth: DstrokeW,
          stroke: `hsl(0, ${P_S}%, 50%)`,
          opacity: Dopacity,
          scale: Dscale,
          ease:  Power1.easeInOut
        });

        console.log(' Ady1:', Ady1, ' Ady2:', Ady2, ' DstrokeW:', DstrokeW, 'P_S:', P_S, 'Dopacity:', Dopacity, 'Dscale:', Dscale);
      });

    // NOTES
    this.pNote = 'P: varies saturation of red line; varies saturation & brightness of green line.';
    this.aNote = 'A: varies amplitude of both red & green lines.';
    this.dNote = 'D: varies stroke width & opacity of red line; varies brightness/darkness & saturation of green line.';
    this.miscNote = 'CHANGE THIS !!!! NEEDS UPDATING!!!!';
  }

  ngOnDestroy() {
    // this.PADprogress.unsubscribe();
    console.log('emoviz3a OnDestroy');
  }

}
