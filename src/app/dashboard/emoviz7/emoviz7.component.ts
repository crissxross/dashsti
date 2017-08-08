import { Component, ElementRef, Input, OnInit, OnDestroy, Renderer, ViewChild } from '@angular/core'; // check version of Renderer !!!!!!!!!
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { TweenMax, TimelineMax, Power1, Back } from 'gsap';
import * as CustomEase from 'gsap/CustomEase';
import * as CustomWiggle from 'gsap/CustomWiggle';

@Component({
  selector: 'app-emoviz7',
  templateUrl: './emoviz7.component.html',
  styleUrls: ['../emoviz.css', './emoviz7.component.css']
})
export class Emoviz7Component implements OnInit, OnDestroy {
  @ViewChild('canvas') canvasRef: ElementRef;

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
    const ctx: CanvasRenderingContext2D = this.canvasRef.nativeElement.getContext('2d');

    this.PADprogress = Observable.combineLatest(
      this.pValue$, this.aValue$, this.dValue$,
      (p, a, d) => ({ P: p, A: a, D: d })
    )
      .subscribe(pad => {
        // console.log('Latest PAD values P:', pad.P, ' A:', pad.A, ' D:', pad.D);
        console.log('Latest PAD:', pad.P, pad.A, pad.D);
      });

      // NOTES
    this.pNote = 'P: ???';
    this.aNote = 'A: ???';
    this.dNote = 'D: ???';
    this.miscNote = 'This uses CANVAS';
  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
    console.log('emoviz7 OnDestroy');
  }

}
