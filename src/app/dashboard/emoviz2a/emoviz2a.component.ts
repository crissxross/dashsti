import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { TweenMax } from 'gsap/TweenMax';

@Component({
  selector: 'app-emoviz2a',
  template: `
    <div class="viz-container">
      <svg>
        <svg:rect #bg class="bg" width="400" height="333"/>
        <svg:ellipse #gP cx="100" cy="80" rx="100" ry="80"/>
        <svg:ellipse #gA cx="100" cy="80" rx="100" ry="80"/>
        <svg:ellipse #gD cx="100" cy="80" rx="100" ry="80"/>
        <svg:ellipse #rP cx="300" cy="80" rx="100" ry="80"/>
        <svg:ellipse #rA cx="300" cy="80" rx="100" ry="80"/>
        <svg:ellipse #rD cx="300" cy="80" rx="100" ry="80"/>
        <!-- NOTE: transforms & opacity are the most performant things to animate
        GSAP shorthand for the transform properties: x, y, z, scale, rotation -->
      </svg>
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
  styleUrls: ['../emoviz.css', './emoviz2a.component.css']
})
export class Emoviz2aComponent implements OnInit, OnDestroy {
// svg elements
  @ViewChild('bg') bg: ElementRef;
  @ViewChild('gP') gP: ElementRef;
  @ViewChild('gA') gA: ElementRef;
  @ViewChild('gD') gD: ElementRef;
  @ViewChild('rP') rP: ElementRef;
  @ViewChild('rA') rA: ElementRef;
  @ViewChild('rD') rD: ElementRef;
// PAD properties
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  pProgress: Subscription;
  aProgress: Subscription;
  dProgress: Subscription;
// notes
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
    TweenMax.set(gP, { fill: 'hsl(137, 50%, 50%)', opacity: 0.5, x: 110, y: 0 });
    TweenMax.set(gA, { fill: 'hsl(137, 50%, 50%)', opacity: 0.5, x: 90, y: 30 });
    TweenMax.set(gD, { fill: 'hsl(137, 50%, 50%)', opacity: 0.5, x: 110, y: 60 });
    TweenMax.set(rP, { fill: 'hsl(0, 50%, 50%)', opacity: 0.5, x: -20, y: 0 });
    TweenMax.set(rA, { fill: 'hsl(0, 50%, 50%)', opacity: 0.5, x: -0, y: 30 });
    TweenMax.set(rD, { fill: 'hsl(0, 50%, 50%)', opacity: 0.5, x: -20, y: 60 });
    // Note: GSAP shorthand for transform properties: x, y, z, scale, rotation

//  P: joint positive function of saturation & brightness (brightness has stronger influence)
    this.pProgress = this.pValue$
      // returns an integer from -100 to 100 (in steps of 10)
      .pipe(map(v => Math.round(v * 100)))
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
      .pipe(map(v => Math.round(v * 100)))
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
      .pipe(map(v => Math.round(v * 100)))
      .subscribe(v => {
        const S = 50 + v / 2.5; // ranges from 10 to 90
        const L = 50 - v / 2.1; // ranges from 97.62 to 2.38
        TweenMax.to(gD, 0.5, { fill: `hsl(137, ${S}%, ${L}%)` });
        TweenMax.to(rD, 0.5, { fill: `hsl(0, ${S}%, ${L}%)` });
        console.log('D v: ', v, ' S: ', S, ' L: ', L);
      });


  // NOTES
    this.pNote = 'P increases: + saturation, ++ brightness (hsl) ';
    // because "Pleasure was simply a joint positive function of color brightness and saturation"
    this.aNote = 'A increases: ++ saturation, - brightness (hsl)';
    // because arousal increases with more saturation
    this.dNote = 'D increases: + saturation, -- brightness (hsl) ';
    // because "dominance decreases sharply with increases in colour brightness"
    this.miscNote = 'Opacity 0.5 all ellipses';
  }
  // Quotes from 'Effects of Color on Emotions' (Valdez and Mehrabian, 1994)

  ngOnDestroy() {
    this.pProgress.unsubscribe();
    this.aProgress.unsubscribe();
    this.dProgress.unsubscribe();
    // console.log('emoviz2 destroyed');
  }


}
