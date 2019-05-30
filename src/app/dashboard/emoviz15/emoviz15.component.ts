import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { TweenMax, TimelineMax, Circ, Power1, Power2, Power3, Power4 } from 'gsap';

import { getRandom, getRandomInt } from '../../shared/utils';
import { EmoteComponent } from './emote.component';

@Component({
  selector: 'app-emoviz15',
  templateUrl: './emoviz15.component.html',
  styleUrls: ['./emoviz15.component.css']
})
export class Emoviz15Component implements OnInit, AfterViewInit {
  @ViewChildren(EmoteComponent)
  public sprites: QueryList<EmoteComponent>;
  numOfSprites = 15; // 15 TODO: @Input? as in gsap-lights
  spriteWidth = 82;
  spriteHeight = 82;
  // TODO: won't need ticksPerFrame when using GSAP onUpdate callback
  ticksPerFrame = 1; // can use fractions, e.g. 0.5, to speed up sprite anim
  // imageUrl = '../../../assets/pPos0.9.png';
  imageUrl = '../../../assets/pPos1radial.png';
  offsetX = 100; // 40
  offsetY = 100; // 25

  constructor() { }

  // this technique from gsap-lights [tuts/angular/gsap-lights]
  get sizeArray() {
    return new Array(this.numOfSprites);
  }

  ngOnInit() {
    // creates a fade in
    TweenMax.from('.viz-container', 3, {opacity: 0});
    this.offsetX = getRandomInt(-10, 10);
    this.offsetY = getRandomInt(-5, 5);
  }

  ngAfterViewInit() {
    // this.sprites.forEach(sprite => console.log('ngAfterViewInit sprite:', sprite));
    this.sprites.forEach(sprite => this.initSpriteGrid());
  }

  initSpriteGrid() {
    return this.sprites.forEach(sprite => {
      return TweenMax.set('.emote', {
        x: (index: number, target: any) => this.setX(index, target, this.offsetX),
        y: (index: number, target: any) => this.setY(index, target, this.offsetY),
      });
    });
  }

  setX(index: number, target: any, offset: number) {
    return index < 5 ? index * this.spriteWidth + this.randomOffset(offset)
          : index > 9 ? (index - 10) * this.spriteWidth + this.randomOffset(offset)
          : (index - 5) * this.spriteWidth + this.randomOffset(offset);
  }

  setY(index: number, target: any, offset: number) {
    return index < 5 ? 0 + this.randomOffset(offset)
          : index > 9 ? this.spriteHeight * 2 + this.randomOffset(offset)
          : this.spriteHeight + this.randomOffset(offset);
  }

  // randomOffset to avoid a rigidly regular grid
  randomOffset(offset: number) {
    return getRandomInt(-offset, offset);
  }


}
