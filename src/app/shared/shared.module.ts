import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashMaterialModule } from './dash-material.module';

import { UicontrolsComponent } from './uicontrols/uicontrols.component';
import { PadBarchartComponent } from './pad-barchart/pad-barchart.component';


@NgModule({
  imports: [
    CommonModule,
    DashMaterialModule,
  ],
  exports: [
    CommonModule,
    DashMaterialModule,
    UicontrolsComponent,
    PadBarchartComponent
  ],
  declarations: [
    UicontrolsComponent,
    PadBarchartComponent
  ]
})
export class SharedModule { }
