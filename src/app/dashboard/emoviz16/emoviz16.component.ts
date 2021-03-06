import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';

import { Observable, Subscription, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromPad from '../../reducers';

import { TweenMax, Power1 } from 'gsap/TweenMax';
import { polarToCartesianX, polarToCartesianY } from '../../shared/utils';

@Component({
  selector: 'app-emoviz16',
  templateUrl: './emoviz16.component.html',
  styleUrls: ['../emoviz.css', './emoviz16.component.css']
})
export class Emoviz16Component implements OnInit, OnDestroy {
  @ViewChild('emosvg', {static: true}) emosvg: ElementRef;
  @ViewChild('svg1', {static: true}) svg1: ElementRef;

  // PAD properties
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  PADprogress: Subscription;

  constructor(private store: Store<fromPad.State>) {
    this.pValue$ = store.pipe(select(fromPad.getP));
    this.aValue$ = store.pipe(select(fromPad.getA));
    this.dValue$ = store.pipe(select(fromPad.getD));
  }

  ngOnInit() {
    const emosvg = this.emosvg.nativeElement;
    // TweenMax.set(emosvg, { opacity: 0 });
    // TweenMax.to(emosvg, 0.5, { opacity: 1, delay: 0.5 });
    // TweenMax.to(emosvg, 1, {scale: 0.5, delay: 2});
    const svg1 = this.svg1.nativeElement;
    TweenMax.to(svg1, 1, {rotation: 340, delay: 1});

    this.PADprogress = combineLatest(this.pValue$, this.aValue$, this.dValue$, (p, a, d) => ({
      P: p,
      A: a,
      D: d
    })).subscribe(pad => {
      console.log('Latest PAD:', pad.P, pad.A, pad.D);

      // TODO: more stuff here & pass PAD values down to child components
    });

  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
    console.log('emoviz16 OnDestroy');
  }
}
