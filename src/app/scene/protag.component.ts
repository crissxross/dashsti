import { Component, Input, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-protag',
  template: `
        <div class="protag">

      <div class="speaks-container">
        <div class="protag-speaks">
          <!--{{ protagSpeak }}-->
          Dummy text for protag speaks
        </div>
      </div>

      <div class="thinks-container">
        <div class="protag-thinks">
          <!--{{ protagThink }}-->
          Dummy protag thinks
        </div>
<!-- WHERE DOES ACTORVIZ GO? -->
    <div class="protag-viz-container">
      <app-actorviz class="protag-viz"></app-actorviz>
    </div>
      </div>


      <div class="options-container">
          <ul class="protag-options">
            <!--<li *ngIf="OP_option">-->
            <li>
              <button (click)="selectOP($event)">
                <!--{{ OP_option.text }}-->
                Dummy text option
              </button>
            </li>
            <!--<li *ngIf="VK_option">-->
            <li>
              <button (click)="selectVK($event)">
                <!--{{ VK_option.text }}-->
                Dummy text
              </button>
            </li>
            <!--<li *ngIf="UN_option">-->
            <li>
              <button (click)="selectUN($event)">
                <!--{{ UN_option.text }}-->
                Dummy option
              </button>
            </li>
          </ul>
      </div>

    </div>
  `,
  styleUrls: ['./protag.component.css']
})
export class ProtagComponent implements OnInit {
  @Input() protagThink;
  @Input() protagSpeak;
  @Input() OP_option;
  @Input() VK_option;
  @Input() UN_option;

  constructor() { }

  ngOnInit() {
  }

    // not sure what the purpose of event is yet
  selectOP(event) {
    console.log('OP selected! Event: ', event);
  }

  selectVK(event) {
    console.log('VK selected! Event: ', event);
  }

  selectUN(event) {
    console.log('UN selected! Event: ', event);
  }

}
