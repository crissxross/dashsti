import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { TweenMax } from 'gsap/TweenMax';

@Component({
  selector: 'app-emoviz3',
  template: `
    <div class="viz-container">
      <svg>
        <svg:rect #bg class="bg" width="400" height="333"/>
        <svg:path #guide d="
          M 0 250
          c 25 -10, 25 -10, 50 0
          c 25 10, 25 10, 50 0
          c 25 -10, 25 -10, 50 0
          c 25 10, 25 10, 50 0
          c 25 -10, 25 -10, 50 0
          c 25 10, 25 10, 50 0
          c 25 -10, 25 -10, 50 0
          c 25 10, 25 10, 50 0
        "/>
        <svg:path #emoLine d="
          M 0 100
          c 25 -10, 25 -10, 50 0
          c 25 10, 25 10, 50 0
          c 25 -10, 25 -10, 50 0
          c 25 10, 25 10, 50 0
          c 25 -10, 25 -10, 50 0
          c 25 10, 25 10, 50 0
          c 25 -10, 25 -10, 50 0
          c 25 10, 25 10, 50 0
        "/>
      </svg>
    <!-- NOTES -->
      <div class="notes">Notes<br>
        <ul>
          <li>{{pNote}}</li>
          <li>{{aNote}}</li>
          <li>{{dNote}}</li>
          <li>{{miscNote}}</li>
        </ul>
      </div>
    </div>
  `,
  // templateUrl: './emoviz3.component.html',
  styleUrls: ['../emoviz.css', './emoviz3.component.css']
})
export class Emoviz3Component implements OnInit, OnDestroy {
// svg elements
  @ViewChild('bg') bg: ElementRef;
  @ViewChild('emoLine') emoLine: ElementRef;
  @ViewChild('guide') guide: ElementRef;
// PAD properties
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;

  pProgress: Subscription;
  aProgress: Subscription;
  dProgress: Subscription;
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
    TweenMax.set(guide, { stroke: 'hsl(137, 10%, 70%)', fill: 'none', opacity: 0.5, y: '-=20' });
    // Note: GSAP shorthand for transform properties: x, y, z, scale, rotation

//  PAD combined:
  // combineLatest takes an optional mapping function (last) after input Observables
    this.PADprogress = combineLatest(
      this.pValue$, this.aValue$, this.dValue$,
      (pVal, aVal, dVal) => ({P: pVal, A: aVal, D: dVal})
    )
      .subscribe(pad => {
        console.log('Latest PAD values P:', pad.P, ' A:', pad.A, ' D:', pad.D);
        const P_S = 50 + pad.P * 50; // range from 0 to 100
        const Pdx1 = 25; // 25 + pad.P * 10; // range from 15 to 35 : needs work !!!!!
        const Pdx2 = 25; // 15 + pad.P * 10; // range from 5 to 25 : needs work !!!!!
        const Ady1 = Math.round((pad.A + 1) * 30); // range from 0 to 60;
        const Ady2 = Math.round((pad.A + 1) * 30); // range from 0 to 60;
        const DstrokeW = 11 + pad.D * 10; // range from 1 to 21
        const Dopacity = (1 + pad.D) / 2; // range from 0 to 1

        TweenMax.to(emoLine, 0.5, {
          attr: {
            d: `M 0 100
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
          opacity: Dopacity
        });

        console.log('Pdx1:', Pdx1, ' Pdx2:', Pdx2,
          ' Ady1:', Ady1, ' Ady2:', Ady2, ' DstrokeW:', DstrokeW, 'P_S:', P_S, 'Dopacity:', Dopacity);
      });


//  P: joint positive function of saturation & brightness (brightness has stronger influence)
    this.pProgress = this.pValue$
      // returns an integer from -100 to 100 (in steps of 10)
      .pipe(map(v => Math.round(v * 100)))
      .subscribe(v => {
        const S = 50 + v / 2.5; // ranges from 10 to 90
        const L = 50 + v / 2.1; // ranges from 2.38 to 97.62
        TweenMax.to(guide, 0.5, { stroke: `hsl(137, ${S}%, ${L}%)` });
        // console.log('P v: ', v, ' S: ', S, ' L: ', L);
      });

//  A: as Arousal increases, saturation increases strongly & brightness decreases
    this.aProgress = this.aValue$
      // returns a positive integer from 0 to 60
      .pipe(map(v => Math.round((v + 1) * 30)))
      .subscribe(v => {
        const dx = 25;
        TweenMax.to(guide, 0.5, {
          attr: {
            d: `M 0 250
            c ${dx} -${v}, ${dx} -${v}, 50 0
            c ${dx} ${v}, ${dx} ${v}, 50 0
            c ${dx} -${v}, ${dx} -${v}, 50 0
            c ${dx} ${v}, ${dx} ${v}, 50 0
            c ${dx} -${v}, ${dx} -${v}, 50 0
            c ${dx} ${v}, ${dx} ${v}, 50 0
            c ${dx} -${v}, ${dx} -${v}, 50 0
            c ${dx} ${v}, ${dx} ${v}, 50 0
          ` }
        });
      });

//  D: as Dominance increases, saturation increases & brightness decreases strongly
    this.dProgress = this.dValue$
      // returns an integer from -100 to 100 (in steps of 10)
      .pipe(map(v => Math.round(v * 100)))
      .subscribe(v => {
        const strokeW = 5 + v / 25;
        const S = 50 + v / 2.5; // ranges from 10 to 90
        const L = 50 - v / 2.1; // ranges from 97.62 to 2.38
        TweenMax.to(guide, 0.5, { stroke: `hsl(137, ${S}%, ${L}%)`, strokeWidth: strokeW });
        // console.log('D v: ', v, ' S: ', S, ' L: ', L, 'strokeW: ', strokeW);
      });


// NOTES
    this.pNote = 'P: varies saturation of red line; varies saturation & brightness of green line.';
    this.aNote = 'A: varies amplitude of both red & green lines.';
    this.dNote = 'D: varies stroke width & opacity of red line; varies brightness/darkness & saturation of green line.';
    this.miscNote = '';

  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
    this.pProgress.unsubscribe();
    this.aProgress.unsubscribe();
    this.dProgress.unsubscribe();
  }

}
