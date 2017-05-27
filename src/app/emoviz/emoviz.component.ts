import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

import { Store } from '@ngrx/store';
import * as PadActions from '../pad-actions';
import * as fromRoot from '../reducers';
import { TweenMax, TimelineMax } from 'gsap';

@Component({
  selector: 'app-emoviz',
  template: `
    <div class="viz-container">

      <svg width="400" height="300">
        <svg:rect #background x = "0" y = "0" width="100%" height="100%" [attr.fill]="bg"/>

        <!--<text x="20" y="30">emoviz SVG text</text>
        <text x="20" y="60">
          P: {{pValue$ | async | number}} |
          A: {{aValue$ | async | number}} |
          D: {{dValue$ | async | number}} |
        </text>-->

        <svg:g id="polygroup">
          <svg:polygon #poly6 class="cls-1"
            points="60.5 52.5 30.5 69.9 0.5 52.5 0.5 17.9 30.5 0.6 60.5 17.9 60.5 52.5"/>
          <svg:polygon #poly8 class="cls-1"
            points="42.9 0.5 18.1 0.5 0.5 18.1 0.5 42.9 18.1 60.5 42.9 60.5 60.5 42.9 60.5 18.1 42.9 0.5"/>
          <polygon #triangle class="cls-1"
            points="35.5 1 0.9 61 70.1 61 35.5 1"/>
        </svg:g>

      </svg>
    </div>
  `,
  styleUrls: ['./emoviz.component.css']
})
export class EmovizComponent implements OnInit, OnDestroy {
  @Input() bg;
// svg elements
  @ViewChild('poly6') poly6: ElementRef;
  @ViewChild('poly8') poly8: ElementRef;
  @ViewChild('triangle') triangle: ElementRef;
// PAD properties
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  pProgressSub: Subscription;
  aProgressSub: Subscription;
  dProgressSub: Subscription;

  constructor(private store: Store<fromRoot.State>) {
    this.pValue$ = store.select(state => state.pad.P);
    this.aValue$ = store.select(state => state.pad.A);
    this.dValue$ = store.select(state => state.pad.D);
   }

  ngOnInit() {
    const poly6El = this.poly6.nativeElement;
    const poly8El = this.poly8.nativeElement;
    const trianEl = this.triangle.nativeElement;
    // approximately centred in a group
    TweenMax.set(poly6El, { x: 60, y: 114 });
    TweenMax.set(poly8El, { x: 168, y: 119 });
    TweenMax.set(trianEl, { x: 267, y: 118 });

// ? Would it be better to map PAD values to timeline labels?
  // Then I could use tl.pause(PADvalue);
  // see: https://greensock.com/docs/#/HTML5/GSAP/TimelineMax/pause/

// P
    const pTl = new TimelineMax({ paused: true });

    this.pProgressSub = this.pValue$
      // map bipolar scale to unipolar of only positive values
      .map(v => (v + 1) / 2)
      .subscribe(v => {
      pTl.progress(v).play();
      console.log('pProgressSub v: ', v);
      // console.log('tl.progress() ', tl.progress()); // initially returns NaN
    });

    // tl.progress(0).play();
    pTl.to(poly6El, 2, { delay: 1, x: 200, y: 20 });
    pTl.to(poly8El, 3, { x: 240, y: 200 }, '-=1');
    pTl.to(trianEl, 2, { x: 40, y: 70 }, '-=1');
    pTl.to(poly6El, 2, { rotation: 360, transformOrigin: '50% 50%' });
    pTl.to(poly8El, 2, { rotation: 360, transformOrigin: '50% 50%' }, '-=1');
    pTl.to(trianEl, 2, { rotation: 360, transformOrigin: '50% 50%' }, '-=1');
    pTl.to(poly6El, 2, { x: 60, y: 114 });
    pTl.to(poly8El, 2, { x: 60, y: 114 }, '-=1');
    pTl.to(trianEl, 2, { x: 60, y: 118 }, '-=1');
    pTl.to(poly6El, 2, { x: 267, y: 114 });
    pTl.to(poly8El, 2, { x: 168, y: 119 }, '-=1');

// A
    const aTl = new TimelineMax({ paused: true });

    this.aProgressSub = this.aValue$
      .map(v => (v + 1) / 2)
      .subscribe(v => {
        aTl.progress(v).play();
        // console.log('a v: ', v);
      });

    // aTl.progress(0).play();
    aTl.to(poly6El, 3, { fill: 'green', opacity: 0.5 });
    aTl.to(poly8El, 3, { fill: 'green', opacity: 0.3 });
    aTl.to(trianEl, 3, { fill: 'green', opacity: 0.2 });
    aTl.to(poly6El, 3, { fill: 'red', opacity: 0.3 });
    aTl.to(poly8El, 3, { fill: 'red', opacity: 0.2 });
    aTl.to(trianEl, 3, { fill: 'red', opacity: 0.5 });

// D
    this.dProgressSub = this.dValue$
      // .map(v => ((v + 1) / 2) * 2)
      .map(v => (v + 1.1) * 1.5)
      .subscribe(v => {
        console.log('d v: ', v);
        TweenMax.staggerTo([poly6El, poly8El, trianEl], 2, { scale: v }, 0.2);
      });

  }

  ngOnDestroy() {
    this.pProgressSub.unsubscribe();
    this.aProgressSub.unsubscribe();
    this.dProgressSub.unsubscribe();
  }

}
