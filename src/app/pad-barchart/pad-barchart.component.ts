import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pad-barchart',
  template: `
    <div class="chart-container">
      <!--<p>PAD barchart</p>-->
      <svg width="160" height="200">
        <svg:rect #P x="10" [attr.y]="pY" width="40px" [attr.height]="pHeight" [attr.fill]="pFill" />
        <svg:rect #A x="60" [attr.y]="aY" width="40px" [attr.height]="aHeight" [attr.fill]="aFill" />
        <svg:rect #D x="110" [attr.y]="dY" width="40px" [attr.height]="dHeight" [attr.fill]="dFill" />
        <svg:line x1="0" y1="100" x2="160" y2="100" stroke="white"/>
      </svg>
      <div class="labels">
        <ul>
          <li>P</li>
          <li>A</li>
          <li>D</li>
        </ul>
        <ul>
          <li><small>{{pValue}}</small></li>
          <li><small>{{aValue}}</small></li>
          <li><small>{{dValue}}</small></li>
        </ul>
      </div>
    </div>
  `,
  styleUrls: ['./pad-barchart.component.css']
})
export class PadBarchartComponent implements OnInit, OnChanges {
  @Input() pValue;
  @Input() aValue;
  @Input() dValue;
  pHeight = 0;
  aHeight = 0;
  dHeight = 0;
  pY = 100;
  aY = 100;
  dY = 100;
  pFill: string;
  aFill: string;
  dFill: string;
  fillPos = '#c0c0c0';
  fillNeg = '#7f7f7f';

  constructor() { }

  ngOnInit() {
  }

  // CHANGE THIS TO OBSERVABLES ? (FROM NGRX/STORE)

  ngOnChanges(changes: SimpleChanges) {
    // console.log('changes: ', changes);
    if (changes.pValue && changes.pValue.currentValue >= 0) {
      // console.log('Pos changes.pValue: ', changes.pValue);
      this.pY = 100 - this.pValue;
      this.pHeight = this.pValue;
      this.pFill = this.fillPos;
    } else if (changes.pValue && changes.pValue.currentValue < 0) {
      // console.log('Neg changes.pValue: ', changes.pValue);
      this.pY = 100;
      this.pHeight = Math.abs(this.pValue);
      this.pFill = this.fillNeg;
    } else if (changes.aValue && changes.aValue.currentValue >= 0) {
      // console.log('Pos changes.aValue: ', changes.aValue);
      this.aY = 100 - this.aValue;
      this.aHeight = this.aValue;
      this.aFill = this.fillPos;
    } else if (changes.aValue && changes.aValue.currentValue < 0) {
      // console.log('Neg changes.aValue: ', changes.aValue);
      this.aY = 100;
      this.aHeight = Math.abs(this.aValue);
      this.aFill = this.fillNeg;
    } else if (changes.dValue && changes.dValue.currentValue >= 0) {
      // console.log('Pos changes.dValue: ', changes.dValue);
      this.dY = 100 - this.dValue;
      this.dHeight = this.dValue;
      this.dFill = this.fillPos;
    } else if (changes.dValue && changes.dValue.currentValue < 0) {
      // console.log('Neg changes.dValue: ', changes.dValue);
      this.dY = 100;
      this.dHeight = Math.abs(this.dValue);
      this.dFill = this.fillNeg;
    }

  }

}
