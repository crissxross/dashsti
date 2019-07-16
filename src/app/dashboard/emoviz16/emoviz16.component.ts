import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { TweenMax, Power1 } from 'gsap/TweenMax';
import { polarToCartesianX, polarToCartesianY } from '../../shared/utils';

@Component({
  selector: 'app-emoviz16',
  templateUrl: './emoviz16.component.html',
  styleUrls: ['../emoviz.css', './emoviz16.component.css']
})
export class Emoviz16Component implements OnInit {
  @ViewChild('emosvg', {static: true}) emosvg: ElementRef;
  @ViewChild('svg1', {static: true}) svg1: ElementRef;

  constructor() { }

  ngOnInit() {
    const emosvg = this.emosvg.nativeElement;
    // TweenMax.set(emosvg, { opacity: 0 });
    // TweenMax.to(emosvg, 0.5, { opacity: 1, delay: 0.5 });
    // TweenMax.to(emosvg, 1, {scale: 0.5, delay: 2});
    const svg1 = this.svg1.nativeElement;
    TweenMax.to(svg1, 1, {rotation: 340, delay: 1});

  }

}
