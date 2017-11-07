import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { TweenMax, TimelineMax, Power0 } from 'gsap';
import * as CustomEase from 'gsap/CustomEase';
import * as CustomWiggle from 'gsap/CustomWiggle';

@Component({
  selector: 'app-emovizx',
  template: `
    <div class="viz-container">
      <svg>
        <svg:rect #bg x="0" y="0" width="400" height="333" fill="#201818" />
        <svg:g id="polygroup">
          <svg:polygon #poly6 class="cls-1"
            points="60.5 52.5 30.5 69.9 0.5 52.5 0.5 17.9 30.5 0.6 60.5 17.9 60.5 52.5"/>
          <svg:polygon #poly8 class="cls-1"
            points="42.9 0.5 18.1 0.5 0.5 18.1 0.5 42.9 18.1 60.5 42.9 60.5 60.5 42.9 60.5 18.1 42.9 0.5"/>
          <polygon #triangle class="cls-1"
            points="35.5 1 0.9 61 70.1 61 35.5 1"/>
        </svg:g>
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
  styleUrls: ['../emoviz.css', './emovizx.component.css']
})
export class EmovizxComponent implements OnInit, OnDestroy {
// svg elements
  @ViewChild('bg') bg: ElementRef;
  @ViewChild('poly6') poly6: ElementRef;
  @ViewChild('poly8') poly8: ElementRef;
  @ViewChild('triangle') triangle: ElementRef;
// PAD properties
  pValue$: Observable<number>;
  aValue$: Observable<number>;
  dValue$: Observable<number>;
  pProgress: Subscription;
  aProgress: Subscription;
  dProgress: Subscription;
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
    const poly6El = this.poly6.nativeElement;
    const poly8El = this.poly8.nativeElement;
    const trianEl = this.triangle.nativeElement;
    // approximately centred in a group
    TweenMax.set(poly6El, {
      x: 60, y: 114, fill: 'hsl(137, 50%, 50%)', opacity: 0.5
    });
    TweenMax.set(poly8El, {
      x: 168, y: 119, fill: 'hsl(137, 50%, 50%)', opacity: 0.5
    });
    TweenMax.set(trianEl, {
      x: 267, y: 118, fill: 'hsl(137, 50%, 50%)', opacity: 0.5
    });

    // I don't think hsl colours are working so well.
    // I might have to change to an array (or object map) of hex colours
    // like Material Design uses

    CustomWiggle.create('wiggle', { wiggles: 5 });
    TweenMax.to(trianEl, 4, {x: 250, ease: 'wiggle' });

// P
    this.pProgress = this.pValue$
      // returns a positive integer in steps of 5 from 0 to 100
      .pipe(map(v => Math.round((v + 1) * 50)))
      .subscribe(v => {
        console.log('P v: ', v);
        TweenMax.staggerTo([poly6El, poly8El, trianEl], 1, {
          fill: `hsl(137, ${v}%, +=0)`
         }, 0.1);
      });

// A
    this.aProgress = this.aValue$
      // returns a positive integer from 0 to 20
      .pipe(map(v => Math.round((v + 1) * 10)))
      .subscribe(v => {
        console.log('A v: ', v);
        CustomWiggle.create('wiggle', { wiggles: v, type: 'easeInOut' });
        TweenMax.staggerTo([poly6El, poly8El, trianEl], 2, {
          x: `+=${v}`, y: `+=${v}`,
          rotation: `+=${v}`, transformOrigin: '50% 50%',
          ease: 'wiggle', repeat: -1
        }, 0.05);
      });

// D
    this.dProgress = this.dValue$
      // .pipe(map(v => ((v + 1) / 2) * 2))
      .pipe(map(v => (v + 1.1) * 1.5))
      .subscribe(v => {
        console.log('D v: ', v);
        TweenMax.staggerTo([poly6El, poly8El, trianEl], 2, { scale: v }, 0.2);
      });

    // NOTES
    this.pNote = 'P: hsl saturation varies';
    this.aNote = 'A: various CustomWiggle properties';
    this.dNote = 'D: scale varies';

  }

  ngOnDestroy() {
    this.pProgress.unsubscribe();
    this.aProgress.unsubscribe();
    this.dProgress.unsubscribe();
  }

}
