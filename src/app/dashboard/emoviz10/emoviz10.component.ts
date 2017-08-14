import { Component, ElementRef, Input, OnInit, OnDestroy, Renderer, ViewChild } from '@angular/core'; // check version of Renderer !!!!!!!!!
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
// import 'rxjs/add/operator/map';
import 'rxjs/add/observable/combineLatest';

import { Store } from '@ngrx/store';
import * as PadActions from '../../pad-actions';
import * as fromRoot from '../../reducers';
// import { TweenMax, TimelineMax, Power1, Back } from 'gsap';
// import * as CustomEase from 'gsap/CustomEase';
// import * as CustomWiggle from 'gsap/CustomWiggle';
import { Particle } from '../particle';

@Component({
  selector: 'app-emoviz10',
  templateUrl: './emoviz10.component.html',
  styleUrls: ['./emoviz10.component.css']
})
export class Emoviz10Component implements OnInit, OnDestroy {
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

  constructor(private store: Store<fromRoot.State>) {
    this.pValue$ = store.select(state => state.pad.P);
    this.aValue$ = store.select(state => state.pad.A);
    this.dValue$ = store.select(state => state.pad.D);
 }

ngOnInit() {
  this.updateParticles();
  this.intervalId = setInterval(() => this.updateParticles(), 100);

  this.PADprogress = Observable.combineLatest(
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
  this.pNote = 'P: ';
  this.aNote = 'A: ';
  this.dNote = 'D: ';
  this.miscNote = 'CANVAS & SVG';
  }

  ngOnDestroy() {
    this.PADprogress.unsubscribe();
    clearInterval(this.intervalId);
    console.log('emoviz9 OnDestroy');
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
