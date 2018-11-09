import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { Store } from '@ngrx/store';
// import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { TweenMax } from 'gsap/TweenMax';

@Component({
  selector: 'app-emoviz5',
  templateUrl: './emoviz5.component.html',
  styleUrls: ['../emoviz.css', './emoviz5.component.css']
})
export class Emoviz5Component implements OnInit, OnDestroy {
  // svg elements
  @ViewChild('bg') bg: ElementRef;
  @ViewChild('emoWav') emoWav: ElementRef;
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

    // set default PAD 000 values of SVG elements to animate
    TweenMax.set(bg, { fill: 'hsl(137, 30%, 10%)' });

// THESE element REFERENCES ARE NOT WORKING !!!!!!!
// Is it because they are SVG attributes, not elements? ???????
    // TweenMax.set(emoWav, { x: '-=25', stroke: 'hsl(0, 50%, 50%)', strokeWidth: 2, fill: 'none' });
    // TweenMax.set(emoZZ, { x: '-=25', y: '+=20', stroke: 'hsl(0, 50%, 50%)', strokeWidth: 12, fill: 'none', opacity: 0.9 });

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
      });

    // NOTES
    this.pNote = 'P: varies curvy/angular, saturation & brightness of line.';
    this.aNote = 'A: varies amplitude of line.';
    this.dNote = 'D: varies stroke width & scale of line.';
    this.miscNote = 'CHANGE THIS !!!!!!!!!!!!!!';
  }

  ngOnDestroy() {
    console.log('emoviz5 destroyed');
  }

}
