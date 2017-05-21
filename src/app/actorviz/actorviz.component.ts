import { Component, ElementRef, Input, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { TweenMax } from 'gsap';

@Component({
  selector: 'app-actorviz',
  // templateUrl: './actorviz.component.html',
  template: `
    <div class="viz-container">
      <p>actorviz | P: {{pValue}}% | A: {{aValue}}% | D: {{dValue}}%</p><br>

      <svg width="160" height="200">
        <svg:rect #P x="10" [attr.y]="pY" width="40px" [attr.height]="pHeight" />
        <svg:rect #A x="60" [attr.y]="aY" width="40px" [attr.height]="aHeight" />
        <svg:rect #D x="110" [attr.y]="dY" width="40px" [attr.height]="dHeight" />
        <svg:line x1="0" y1="100" x2="160" y2="100" stroke="white"/>
      </svg>

    </div>
  `,
  styleUrls: ['./actorviz.component.css']
})
export class ActorvizComponent implements OnInit, OnChanges {
  @Input() pValue;
  @Input() aValue;
  @Input() dValue;
  pHeight = 0;
  aHeight = 0;
  dHeight = 0;
  pY = 100;
  aY = 100;
  dY = 100;
  // @ViewChild... for animating SVG
  // @ViewChild('P') P: ElementRef;
  // @ViewChild('A') A: ElementRef;
  // @ViewChild('D') D: ElementRef;

  // pHeight = 50; // was for TweenMax animating SVG

  constructor() { }

  ngOnInit() {
    // This does not work now that I've fully implemented ngOnChanges
    // TweenMax.to(this.P.nativeElement, 2, { height: this.pHeight, delay: 2, repeat: -1, yoyo: true });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('changes: ', changes);
    if (changes.pValue && changes.pValue.currentValue >= 0) {
      // console.log('Pos changes.pValue: ', changes.pValue);
      this.pY = 100 - this.pValue;
      this.pHeight = this.pValue;
    } else if (changes.pValue && changes.pValue.currentValue < 0) {
      // console.log('Neg changes.pValue: ', changes.pValue);
      this.pY = 100;
      this.pHeight = Math.abs(this.pValue);
    } else if (changes.aValue && changes.aValue.currentValue >= 0) {
      // console.log('Pos changes.aValue: ', changes.aValue);
      this.aY = 100 - this.aValue;
      this.aHeight = this.aValue;
    } else if (changes.aValue && changes.aValue.currentValue < 0) {
      // console.log('Neg changes.aValue: ', changes.aValue);
      this.aY = 100;
      this.aHeight = Math.abs(this.aValue);
    } else if (changes.dValue && changes.dValue.currentValue >= 0) {
      // console.log('Pos changes.dValue: ', changes.dValue);
      this.dY = 100 - this.dValue;
      this.dHeight = this.dValue;
    } else if (changes.dValue && changes.dValue.currentValue < 0) {
      // console.log('Neg changes.dValue: ', changes.dValue);
      this.dY = 100;
      this.dHeight = Math.abs(this.dValue);
    }

    // for (let propName in changes) {
    //   console.log('propname changed: ', changes[propName]);
    // }
  }

}

// MAYBE I SHOULD TRY AND SOLVE THIS USING NGRX? See the basic incrementing & decrementing numbers example in converseng-test3.
