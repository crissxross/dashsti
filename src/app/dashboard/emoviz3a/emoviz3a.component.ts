import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as PadActions from '../../actions/pad.actions';
import * as fromPad from '../../reducers';
import { TweenMax, TimelineMax, Power1, Back } from 'gsap/TweenMax';

@Component({
  selector: 'app-emoviz3a',
  templateUrl: './emoviz3a.component.html',
  styleUrls: ['../emoviz.css', './emoviz3a.component.css']
})
export class Emoviz3aComponent implements OnInit, OnDestroy {
  // svg elements
  @ViewChild('bg', {static: true}) bg: ElementRef;
  @ViewChild('emoLine', {static: true}) emoLine: ElementRef;
  @ViewChild('emoZZ', {static: true}) emoZZ: ElementRef;
  // PAD properties
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  PADprogress: Subscription;

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
    const bg = this.bg.nativeElement;
    const emoLine = this.emoLine.nativeElement;
    const emoZZ = this.emoZZ.nativeElement;

    // set default PAD 000 values of SVG elements to animate
    TweenMax.set(bg, { fill: 'hsl(137, 30%, 10%)' });
    TweenMax.set(emoLine, { x: '-=25', stroke: 'hsl(0, 50%, 50%)', strokeWidth: 2, fill: 'none' });
    TweenMax.set(emoZZ, { x: '-=25', y: '+=20', stroke: 'hsl(0, 50%, 50%)', strokeWidth: 2, fill: 'none', opacity: 0.9});
    // Note: GSAP shorthand for transform properties: x, y, z, scale, rotation

    // PAD
    // combineLatest takes an optional mapping function (last) after input Observables
    // NOTE: combineLatest is used here as a static method of Observable class
    this.PADprogress = combineLatest(
      this.pValue$, this.aValue$, this.dValue$,
      (p, a, d) => ({ P: p, A: a, D: d })
    )
      .subscribe(pad => {
        console.log('Latest PAD values P:', pad.P, ' A:', pad.A, ' D:', pad.D);
        // console.log('Latest PAD:', pad);
        const P_S = 50 + pad.P * 50; // range from 0 to 100
        const P_L = 50 + pad.P * 25; // ranges from 25 to 75
        const dx = 50;
        const Pdx1 = 10; // 25;
        const Pdx2 = 40; // 25;
        const PposOpacity = pad.P + 0.2;
        const PnegOpacity = -pad.P + 0.2;
        const Ady1 = Math.round((pad.A + 1) * 30); // range from 0 to 60;
        const Ady2 = Math.round((pad.A + 1) * 30); // range from 0 to 60;
        const Azzy = Math.round((pad.A + 1) * 40); // 15;
        const DstrokeW = 11 + pad.D * 10; // range from 1 to 21
        const Dscale = (1 + pad.D); // range from 0 to 2
        // const Dopacity = (1.5 + pad.D) / 2; // range from 0 to 1

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
          stroke: `hsl(0, ${P_S}%, ${P_L}%)`,
          opacity: PposOpacity,
          scale: Dscale,
          ease:  Power1.easeInOut
        });

        TweenMax.to(emoZZ, 0.5, {
          attr: {
            d: `M-25 107 l
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
              ${dx} -${Azzy}, ${dx} ${Azzy}
          `},
          strokeWidth: DstrokeW,
          stroke: `hsl(0, ${P_S}%, ${P_L}%)`,
          opacity: PnegOpacity,
          scale: Dscale,
          ease:  Power1.easeInOut
        });

        console.log(' Ady1:', Ady1, ' Ady2:', Ady2, ' Azzy:', Azzy,
          ' DstrokeW:', DstrokeW, 'P_S:', P_S, ' P_L:', P_L, 'Dscale:', Dscale);
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
