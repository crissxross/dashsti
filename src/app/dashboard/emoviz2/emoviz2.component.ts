import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { TweenMax, TimelineMax, Power0 } from 'gsap';

@Component({
  selector: 'app-emoviz2',
  template: `
    <div class="viz-container">
      <svg>
        <svg:rect #bg class="bg" width="400" height="333"/>
        <svg:ellipse #gP cx="100" cy="80" rx="100" ry="80"/>
        <svg:ellipse #gA cx="140" cy="90" rx="100" ry="80"/>
        <svg:ellipse #gD cx="180" cy="100" rx="100" ry="80"/>
        <svg:ellipse #rP cx="220" cy="100" rx="100" ry="80"/>
        <svg:ellipse #rA cx="260" cy="90" rx="100" ry="80"/>
        <svg:ellipse #rD cx="300" cy="80" rx="100" ry="80"/>
        <!-- NOTE: transforms & opacity are the most performant things to animate
        GSAP shorthand for the transform properties: x, y, z, scale, rotation -->
      </svg>
      <div class="notes">Notes<br>
        <ul>
          <li>{{pNote}}</li>
          <li>{{aNote}}</li>
          <li>{{dNote}}</li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['../emoviz.css', './emoviz2.component.css']
})
export class Emoviz2Component implements OnInit, OnDestroy {
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
    TweenMax.set(gP, { fill: 'hsl(137, 50%, 50%)', opacity: 0.5 });
    TweenMax.set(gA, { fill: 'hsl(137, 50%, 50%)', opacity: 0.5 });
    TweenMax.set(gD, { fill: 'hsl(137, 50%, 50%)', opacity: 0.5 });
    TweenMax.set(rP, { fill: 'hsl(0, 50%, 50%)', opacity: 0.5 });
    TweenMax.set(rA, { fill: 'hsl(0, 50%, 50%)', opacity: 0.5 });
    TweenMax.set(rD, { fill: 'hsl(0, 50%, 50%)', opacity: 0.5 });

//  P: brightness & saturation
    this.pProgress = this.pValue$
      // returns a positive integer in steps of 5 from 0 to 100
      .map(v => Math.round((v + 1) * 50))
      .subscribe(v => {
        console.log('P v: ', v);
        TweenMax.to(gP, 0.5, { fill: `hsl(137, ${v}%, ${v}%)` });
        TweenMax.to(rP, 0.5, { fill: `hsl(0, ${v}%, ${v}%)` });
      });

//  A: brightness & saturation ???
    this.aProgress = this.aValue$
      // returns a positive integer from 0 to 50
      .map(v => Math.round((v + 1) * 25))
      .subscribe(v => {
        console.log('A v: ', v);
        TweenMax.to(gA, 0.5, { fill: `hsl(137, ${v * 2}%, ${v}%)` });
        TweenMax.to(rA, 0.5, { fill: `hsl(0, ${v * 2}%, ${v}%)` });
      });

//  D: brightness & saturation ??? - needs to be inverse effect of P on brightness !!!
    this.dProgress = this.dValue$
      // returns a positive integer from 0 to 20
      .map(v => Math.round((v + 1) * 10))
      .subscribe(v => {
        console.log('A v: ', v);
        TweenMax.to(gD, 0.5, { fill: `hsl(137, ${v}%, ${v}%)` });
        TweenMax.to(rD, 0.5, { fill: `hsl(0, ${v}%, ${v}%)` });
      });


  // NOTES
    this.pNote = 'P: (hsl) saturation (S) & brightness (L) vary';
    // because "Pleasure was simply a joint positive function of color brightness and saturation" (Valdez & Mehrabian, 1994)
    this.aNote = 'A: (hsl) saturation (S) varies';
    // because arousal increases with more saturation
    this.dNote = 'D: (hsl) brightness (L) varies';
    // because "dominance decreases sharply with increases in colour brightness" (Valdez & Mehrabian, 1994)
  }

  ngOnDestroy() {
    this.pProgress.unsubscribe();
    // this.aProgress.unsubscribe();
    // this.dProgress.unsubscribe();
    console.log('emoviz2 destroyed');
  }


}
