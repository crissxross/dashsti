import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Store, select } from '@ngrx/store';
import * as fromPad from '../../reducers';
import { getRandomInt } from '../../shared/utils';

@Component({
  selector: 'app-emoviz12',
  templateUrl: './emoviz12.component.html',
  styleUrls: ['./emoviz12.component.css']
})
export class Emoviz12Component implements OnInit, OnDestroy {

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


  constructor(private store: Store<fromPad.State>) {
    this.pValue$ = store.pipe(select(fromPad.getP));
    this.aValue$ = store.pipe(select(fromPad.getA));
    this.dValue$ = store.pipe(select(fromPad.getD));
  }

  ngOnInit() {

    // NOTE: combineLatest is used here as a static method of Observable class
    this.PADprogress = combineLatest(
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
    this.pNote = 'P: ';
    this.aNote = 'A: ';
    this.dNote = 'D: HSL saturation & lightness ???';
    this.miscNote = 'Container subscribes to PAD & passes values as inputs to viz12 child/display component';
  }


  ngOnDestroy() {
    this.PADprogress.unsubscribe();
    console.log('emoviz12 OnDestroy');
  }

}
