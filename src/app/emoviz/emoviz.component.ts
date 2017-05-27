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

        <text x="20" y="30">emoviz SVG text</text>
        <text x="20" y="60">
          P: {{pValue$ | async | number}} |
          A: {{aValue$ | async | number}} |
          D: {{dValue$ | async | number}} |
        </text>

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

  constructor(private store: Store<fromRoot.State>) {
    this.pValue$ = store.select(state => state.pad.P);
    this.aValue$ = store.select(state => state.pad.A);
    this.dValue$ = store.select(state => state.pad.D);
   }

  ngOnInit() {
    // approximately centred in a group
    TweenMax.set(this.poly6.nativeElement, { x: 60, y: 114 });
    TweenMax.set(this.poly8.nativeElement, { x: 168, y: 119 });
    TweenMax.set(this.triangle.nativeElement, { x: 267, y: 118 });

    const tl = new TimelineMax({ paused: true });

// ? Would it be better to map PAD values to timeline labels?
// Then I could use tl.pause(PADvalue);
// see: https://greensock.com/docs/#/HTML5/GSAP/TimelineMax/pause/

    this.pProgressSub = this.pValue$
      // map bipolar scale to unipolar of only positive values
      .map(v => (v + 1) / 2)
      .subscribe(v => {
      tl.progress(v).play();
      console.log('pProgressSub v: ', v);
      // console.log('tl.progress() ', tl.progress()); // initially returns NaN
    });

    // tl.progress(0).play();
    tl.to(this.poly6.nativeElement, 2, { delay: 1, x: 200, y: 20 });
    tl.to(this.poly8.nativeElement, 3, { x: 240, y: 200 }, '-=1');
    tl.to(this.triangle.nativeElement, 2, { x: 40, y: 70 }, '-=1');
    tl.to(this.poly6.nativeElement, 2, { rotation: 360, transformOrigin: '50% 50%' });
    tl.to(this.poly8.nativeElement, 2, { rotation: 360, transformOrigin: '50% 50%' }, '-=1');
    tl.to(this.triangle.nativeElement, 2, { rotation: 360, transformOrigin: '50% 50%' }, '-=1');
    tl.to(this.poly6.nativeElement, 2, { x: 60, y: 114 });
    tl.to(this.poly8.nativeElement, 2, { x: 60, y: 114 }, '-=1');
    tl.to(this.triangle.nativeElement, 2, { x: 60, y: 114 }, '-=1');

// P

// A

// D

  }

  ngOnDestroy() {
    this.pProgressSub.unsubscribe();
  }

}
