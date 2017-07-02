import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { TweenMax, TimelineMax, Power0 } from 'gsap';
import * as CustomEase from 'gsap/CustomEase';
import * as CustomWiggle from 'gsap/CustomWiggle';
import * as MorphSVG from 'gsap/MorphSVGPlugin';

@Component({
  selector: 'app-emoviz3',
  templateUrl: './emoviz3.component.html',
  styleUrls: ['../emoviz.css', './emoviz3.component.css']
})
export class Emoviz3Component implements OnInit, OnDestroy {
// svg elements
  @ViewChild('bg') bg: ElementRef;
  @ViewChild('gP') gP: ElementRef;
  @ViewChild('gA') gA: ElementRef;
  @ViewChild('gD') gD: ElementRef;
  @ViewChild('rP') rP: ElementRef;
  @ViewChild('rA') rA: ElementRef;
  @ViewChild('rD') rD: ElementRef;
// temporary
  // @ViewChild('poly6') poly6: ElementRef;
  // @ViewChild('poly8') poly8: ElementRef;
  // @ViewChild('triangle') triangle: ElementRef;
// PAD properties
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  pProgress: Subscription;
  aProgress: Subscription;
  dProgress: Subscription;
// temporary
  // p2Progress: Subscription;
  // a2Progress: Subscription;
  // d2Progress: Subscription;

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
    const gP = this.gP.nativeElement;
    const gA = this.gA.nativeElement;
    const gD = this.gD.nativeElement;
    const rP = this.rP.nativeElement;
    const rA = this.rA.nativeElement;
    const rD = this.rD.nativeElement;

    // set default PAD 000 values of SVG elements to animate
    TweenMax.set(bg, { fill: 'hsl(137, 30%, 10%)' });

    // basic ellipses (w: 200px, h: 160px)
    TweenMax.set(gP, { fill: 'hsl(137, 50%, 50%)', opacity: 0.5, x: 110, y: 0 });
    TweenMax.set(gA, { fill: 'hsl(137, 50%, 50%)', opacity: 0.5, x: 90, y: 30 });
    TweenMax.set(gD, { fill: 'hsl(137, 50%, 50%)', opacity: 0.5, x: 110, y: 60 });
    TweenMax.set(rP, { fill: 'hsl(0, 50%, 50%)', opacity: 0.5, x: 180, y: 0 });
    TweenMax.set(rA, { fill: 'hsl(0, 50%, 50%)', opacity: 0.5, x: 200, y: 30 });
    TweenMax.set(rD, { fill: 'hsl(0, 50%, 50%)', opacity: 0.5, x: 180, y: 60 });
    // Note: GSAP shorthand for transform properties: x, y, z, scale, rotation

// temporary
    // const poly6El = this.poly6.nativeElement;
    // const poly8El = this.poly8.nativeElement;
    // const trianEl = this.triangle.nativeElement;
    // temporary - approximately centred in a group
    // TweenMax.set(poly6El, { x: 60, y: 254, fill: 'hsl(137, 50%, 50%)', opacity: 0.5 });
    // TweenMax.set(poly8El, { x: 168, y: 259, fill: 'hsl(137, 50%, 50%)', opacity: 0.5 });
    // TweenMax.set(trianEl, { x: 267, y: 258, fill: 'hsl(137, 50%, 50%)', opacity: 0.5 });
    // above is temporary

    // just testing
    CustomWiggle.create('wiggle', { wiggles: 5, type: 'easeInOut' });
    // TweenMax.staggerTo([gA, rA], 4, { rotation: 15, ease: 'wiggle', transformOrigin: '50% 50%' }, 0.5);

//  P: joint positive function of saturation & brightness (brightness has stronger influence)
    this.pProgress = this.pValue$
      // returns an integer from -100 to 100 (in steps of 10)
      .map(v => Math.round(v * 100))
      .subscribe(v => {
        const S = 50 + v / 2.5; // ranges from 10 to 90
        const L = 50 + v / 2.1; // ranges from 2.38 to 97.62
        TweenMax.to(gP, 0.5, { fill: `hsl(137, ${S}%, ${L}%)` });
        TweenMax.to(rP, 0.5, { fill: `hsl(0, ${S}%, ${L}%)` });
        console.log('P v: ', v, ' S: ', S, ' L: ', L);
      });

//  A: as Arousal increases, saturation increases strongly & brightness decreases
    this.aProgress = this.aValue$
      // returns an integer from -100 to 100 (in steps of 10)
      .map(v => Math.round(v * 100))
      .subscribe(v => {
        const S = 50 + v / 2; // ranges from 0 to 100
        const L = 50 - v / 3; // ranges from 83.333 to 16.666
        TweenMax.to(gA, 0.5, { fill: `hsl(137, ${S}%, ${L}%)` });
        TweenMax.to(rA, 0.5, { fill: `hsl(0, ${S}%, ${L}%)` });
        console.log('A v: ', v, ' S: ', S, ' L: ', L);
      });

//  D: as Dominance increases, saturation increases & brightness decreases strongly
    this.dProgress = this.dValue$
      // returns an integer from -100 to 100 (in steps of 10)
      .map(v => Math.round(v * 100))
      .subscribe(v => {
        const S = 50 + v / 2.5; // ranges from 10 to 90
        const L = 50 - v / 2.1; // ranges from 97.62 to 2.38
        TweenMax.to(gD, 0.5, { fill: `hsl(137, ${S}%, ${L}%)` });
        TweenMax.to(rD, 0.5, { fill: `hsl(0, ${S}%, ${L}%)` });
        console.log('D v: ', v, ' S: ', S, ' L: ', L);
      });

// TEMPORARY BELOW
  // // P
  //   this.p2Progress = this.pValue$
  //     // returns a positive integer in steps of 5 from 0 to 100
  //     .map(v => Math.round((v + 1) * 50))
  //     .subscribe(v => {
  //       console.log('P2 v: ', v);
  //       TweenMax.staggerTo([poly6El, poly8El, trianEl], 1, {
  //         fill: `hsl(137, ${v}%, +=0)`
  //        }, 0.1);
  //     });

  // // A
  //   this.a2Progress = this.aValue$
  //     // returns a positive integer from 0 to 10
  //     .map(v => Math.round((v + 1) * 5))
  //     .subscribe(v => {
  //       console.log('A2 v: ', v);
  //       CustomWiggle.create('wiggle', { wiggles: v, type: 'uniform' });
  //       TweenMax.staggerTo([poly6El, poly8El, trianEl], 2, {
  //         x: `+=${v}`, y: `+=${v}`,
  //         rotation: `+=${v / 2}`, transformOrigin: '50% 50%',
  //         ease: 'wiggle', repeat: -1
  //       }, 0.05);
  //     });

  // // D
  //   this.d2Progress = this.dValue$
  //     // .map(v => ((v + 1) / 2) * 2)
  //     .map(v => (v + 1.1) * 1.5)
  //     .subscribe(v => {
  //       console.log('D2 v: ', v);
  //       TweenMax.staggerTo([poly6El, poly8El, trianEl], 2, { scale: v }, 0.2);
  //     });

// NOTES
    this.pNote = 'P: hsl saturation varies --- ??????';
    this.aNote = 'A: various CustomWiggle properties --- ??????';
    this.dNote = 'D: scale varies --- ??????';
    this.miscNote = 'CHANGE THIS !!!!!';

  }

  ngOnDestroy() {
    this.pProgress.unsubscribe();
    this.aProgress.unsubscribe();
    this.dProgress.unsubscribe();
  // temporary
    // this.p2Progress.unsubscribe();
    // this.a2Progress.unsubscribe();
    // this.d2Progress.unsubscribe();
  }

}
