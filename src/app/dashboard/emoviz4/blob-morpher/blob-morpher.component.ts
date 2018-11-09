import { Component, ElementRef, OnInit, AfterViewInit, ViewChild } from '@angular/core';

import { TweenMax, TimelineMax, Back, Power4 } from 'gsap/TweenMax';
// import * as MorphSVG from 'gsap/MorphSVGPlugin';

@Component({
  selector: '[blob-morpher]',
  template: `
    <svg:path #blob class="blob" [attr.d]="path1" [attr.fill]="fill"></svg:path>
  `,
  styles: []
})
export class BlobMorpherComponent implements AfterViewInit {
  @ViewChild('blob') blob: ElementRef;

  fill = '#1a1a1a';
  path1 = 'M70.3,103.2c0,0-7.5-58.4,42.9-48.4s43.5,74.5,72,37.9s49.7-72,67.1-36s83.9,92.5,14.3,96.3c-69.6,3.7-82,18-88.8,44.1c-6.8,26.1-93.8,29.8-91.3-18S75.3,134.9,70.3,103.2z';
  path2 = 'M39.9,110.7c0,0,18.6-42.2,68.9-32.3s38.5,11.9,67.1-24.7s44.7,9.8,62.1,45.9s39.1,77-30.4,80.7c-69.6,3.7,19.9,26.1,13,52.2c-6.8,26.1-110.6-11.8-108.1-69.6S-15,225,39.9,110.7z';

  timeline = new TimelineMax({ repeat: -1, yoyo: true});

  constructor() { }

  // previously used ngOnInit() {} but that didn't work either
  ngAfterViewInit() {

    // const path = this.elementRef.nativeElement.firstChild;
    const blob = this.blob.nativeElement;


    // This could all be combined into a single tween. I did this to show that
    // the fill attribute can be animated without a reference to the element
    this.timeline
      .to(blob, 2, { morphSVG: this.path2, x: 120, ease: Power4.easeInOut }, 0)
      .to(this, 2, { fill: 'orange', ease: Power4.easeInOut }, 0);

  }

}
// NOT WORKING !!!!!!!! DON'T KNOW WHY !!!!!!!

// NOTE: copied this code from Blake Bowen's forum post (& codepen) - see:
// https://greensock.com/forums/topic/13594-greensock-tweens-in-angular-2/#comment-59314
