import { Component, ElementRef, Input, OnInit, OnDestroy, Renderer, ViewChild } from '@angular/core'; // check version of Renderer !!!!!!!!!
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { combineLatest } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
import { Emote } from '../e-mote';
import { getRandomInt } from '../../shared/utils';

@Component({
  selector: 'app-emoviz11',
  templateUrl: './emoviz11.component.html',
  styleUrls: ['./emoviz11.component.css']
})
export class Emoviz11Component implements OnInit, OnDestroy {
  emotes: Emote[] = [];
  private intervalId: any;

    // PAD properties
    pValue$: Observable<number>;
    aValue$: Observable<number>;
    dValue$: Observable<number>;
    PADprogress: Subscription;

    // props for viz
    P: number;
    A: number;
    D: number;
    // particleWidth: number;
    // particleHeight: number;
    canvasWidth = 400;
    canvasHeight = 333;

    // Notes
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
      this.intervalId = setInterval(() => this.updateEmotes(), 100);

      // NOTE: combineLatest is used here as a static method of Observable class
      this.PADprogress = Observable.combineLatest(
        this.pValue$, this.aValue$, this.dValue$,
        (p, a, d) => ({ P: p, A: a, D: d })
      )
        .subscribe(pad => {
          console.log('Latest PAD:', pad.P, pad.A, pad.D);
          this.P = pad.P;
          this.A = pad.A;
          this.D = pad.D;
          // this.particleWidth = 12 + Math.round(this.P * 10); // 2 to 22
          // this.particleHeight = 10 + Math.round(this.A * 10); // 0 to 20
          // console.log('particle width & height:', this.particleWidth, this.particleHeight);
        });

      // NOTES
      this.pNote = 'P: start & end angles of arc';
      this.aNote = 'A: radius of arc';
      this.dNote = 'D: HSL saturation & lightness';
      this.miscNote = 'Container subscribes to PAD & passes values as inputs to viz11 child/display component';
    }

    ngOnDestroy() {
      this.PADprogress.unsubscribe();
      clearInterval(this.intervalId);
      console.log('emoviz10a OnDestroy');
    }

    private updateEmotes() {
      this.emotes = [];
      for (let i = 0; i < 10; i++) {
        this.emotes.push({
          x: getRandomInt(200, this.canvasWidth - 50),
          y: getRandomInt(50, this.canvasHeight - 200)
        });
      }
  }

}
