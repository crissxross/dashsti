import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
// import { TweenMax } from 'gsap';

@Component({
  selector: 'app-actorviz',
  // templateUrl: './actorviz.component.html',
  template: `
    <div class="viz-container">
      <p>actorviz | P: {{pValue}}% | A: {{aValue}}% | D: {{dValue}}%</p><br>

      <svg width="160" height="200">
        <!--<svg:rect #P x="10" y="100" width="40px" [attr.height]="pHeight | async" />-->
        <svg:rect #P x="10" y="100" width="40px" [attr.height]="pValue" />
        <svg:rect #A x="60" y="100" width="40px" [attr.height]="aValue" />
        <svg:rect #D x="110" y="100" width="40px" [attr.height]="dValue" />
        <svg:line x1="0" y1="100" x2="160" y2="100" stroke="white"/>
      </svg>

    </div>
  `,
  styleUrls: ['./actorviz.component.css']
})
export class ActorvizComponent implements OnInit {
  @Input() pValue;
  @Input() aValue;
  @Input() dValue;
  // @ViewChild('P') P: ElementRef;
  // @ViewChild('A') A: ElementRef;
  // @ViewChild('D') D: ElementRef;

  // pHeight = 50;
  pHeight = Observable.of(this.pValue);
  // pHeight: Observable<any> = this.pValue;

  // HOW DO I MAP pValue to pHeight?
  // Should they be observables? Currently pValue is of type any !!! What's the significance of that?

  // MAYBE I SHOULD TRY AND SOLVE THIS USING NGRX? See the basic incrementing & decrementing numbers example.

  constructor() { }

  // NOTE - animating with GSAP works but that doesn't solve the pValue to pHeight issue
  ngOnInit() {
    // TweenMax.to(this.P.nativeElement, 2, { height: this.pHeight, delay: 2, repeat: 10, yoyo: true });
  }

}
