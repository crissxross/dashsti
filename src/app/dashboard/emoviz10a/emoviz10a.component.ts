import { Component, ElementRef, Input, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';

import { Store, select } from '@ngrx/store';
import * as PadActions from '../../actions/pad.actions';
import * as fromPad from '../../reducers';
import { Particle } from '../particle';

@Component({
  selector: 'app-emoviz10a',
  templateUrl: './emoviz10a.component.html',
  styleUrls: ['./emoviz10a.component.css']
})
export class Emoviz10aComponent implements OnInit, OnDestroy {
  particles: Particle[] = [];
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
  particleWidth: number;
  particleHeight: number;
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
  this.intervalId = setInterval(() => this.updateParticles(), 100);

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
      this.particleWidth = 12 + Math.round(this.P * 10); // 2 to 22
      this.particleHeight = 10 + Math.round(this.A * 10); // 0 to 20
      // console.log('particle width & height:', this.particleWidth, this.particleHeight);
    });

  // NOTES
  this.pNote = 'P: particle width + SVG';
  this.aNote = 'A: particle height + SVG';
  this.dNote = 'D: S & L of particles & fill, + SVG';
  this.miscNote = 'CANVAS & SVG';
  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
    clearInterval(this.intervalId);
    console.log('emoviz10a OnDestroy');
  }

  private updateParticles() {
    this.particles = [];
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * (this.canvasWidth - this.particleWidth),
        y: Math.random() * (this.canvasHeight - this.particleHeight)
      });
    }
  }

}
