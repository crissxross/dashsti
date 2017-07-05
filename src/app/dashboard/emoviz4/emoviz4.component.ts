import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { TweenMax, TimelineMax, Back } from 'gsap';
import * as CustomEase from 'gsap/CustomEase';
import * as CustomWiggle from 'gsap/CustomWiggle';
import * as MorphSVG from 'gsap/MorphSVGPlugin';

/* NOT WORKING, I think the reason is:
"You can animate most attributes without having a reference to the element...
However, morphing path data is a little different, and GSAP will throw an error
if the type of object being animated is not an element."
See Blake Owen's comment:
https://greensock.com/forums/topic/13594-greensock-tweens-in-angular-2/#comment-59314
**/

@Component({
  selector: 'app-emoviz4',
  template: `
    <div class="viz-container">
      <svg>
        <svg:rect #bg class="bg" width="400" height="333"/>
        <svg:path #P_ [attr.d]="P_path"/>
        <!--<svg:g #Plines id="Plines" class="cls-1">
          <svg:path #P_ id="flat" [attr.d]="P_path"/>
        </svg:g>-->
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
  // templateUrl: './emoviz4.component.html',
  styleUrls: ['../emoviz.css', './emoviz4.component.css']
})
export class Emoviz4Component implements OnInit, OnDestroy {
  // svg elements
  @ViewChild('bg') bg: ElementRef;
  // @ViewChild('Plines') Plines: ElementRef;
  @ViewChild('P_') P_: ElementRef;
  P_path = 'M 0 76 l 200 0';
  Ppos1path = 'M0,75.9C12.5,76,12.4,96,24.9,96S37.5,76.1,50,76.2,62.4,96.2,74.9,96.3,87.5,76.4,100,76.4s12.4,20.1,24.9,20.1S137.5,76.6,150,76.7s12.4,20.1,24.9,20.1S187.5,76.9,200,76.9';
  Ppos2path = 'M0,75.5c42.5-29.6,148.7-29.6,199.9,0';
  Pneg1path = 'M200,76.9,174.9,96.8,150,76.7,124.9,96.5,100,76.4,74.9,96.3,50,76.2,24.9,96,0,75.9';
  Pneg2path = 'M 0 76 l 100 -30 l 100 30';

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
    // const Plines = this.Plines.nativeElement;
    const P_ = this.P_.nativeElement;

    const tlP = new TimelineMax({ repeat: 10, yoyo: true });
    const tlA = new TimelineMax({ paused: true });
    const tlD = new TimelineMax({ paused: true });

    // set default PAD 000 values of SVG elements to animate
    TweenMax.set(bg, { fill: 'hsl(137, 30%, 10%)' });
    // TweenMax.set(Plines, { x: 100, y: 0 });
    TweenMax.set(P_, { stroke: 'hsl(0, 90%, 40%)', strokeWidth: '10px' }); // just testing
    // TweenMax.set(Alines, { x: 100, y: 120 });
    // TweenMax.set([Ppos1, Ppos2, Pneg1, Pneg2, Apos1, Aneg1], { visibility: 'hidden' });
    // Note: GSAP shorthand for transform properties: x, y, z, scale, rotation

      // tlP.to(P_, 1, { morphSVG: this.Ppos1path, ease: Back.easeOut.config(2) }, '+=0.1')
      // .to(P_, 1, { morphSVG: this.Ppos2path, ease: Back.easeOut.config(2) }, '+=0.1')
      // .to(P_, 1, { morphSVG: this.Pneg1path, ease: Back.easeOut.config(2) }, '+=0.1')
      // .to(P_, 1, { morphSVG: this.Pneg2path, ease: Back.easeOut.config(2) }, '+=0.1');

    // combineLatest takes an optional mapping function (last) after input Observables
    this.PADprogress = Observable.combineLatest(
      this.pValue$, this.aValue$, this.dValue$,
      (p, a, d) => ({ P: p, A: a, D: d })
    )
      .subscribe(pad => {
        console.log('Latest PAD values P:', pad.P, ' A:', pad.A, ' D:', pad.D);
        // console.log('Latest PAD:', pad);
      });

    // NOTES
    this.pNote = 'P: timeline position -- ??';
    this.aNote = 'A: timeline position -- ??';
    this.dNote = 'D: timeline position -- ??';
    this.miscNote = 'CHANGE THIS !!!!';

  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
  }

}
// Try mapping PAD values to timeline labels?
// Then use tl.pause(PADvalue);
// see: https://greensock.com/docs/#/HTML5/GSAP/TimelineMax/pause/
