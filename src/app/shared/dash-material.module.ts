import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdIconModule,
  MdToolbarModule,
  MdSidenavModule,
  MdListModule,
  MdSliderModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdIconModule,
    MdToolbarModule,
    MdSidenavModule,
    MdListModule,
    MdSliderModule
  ],
  exports: [
    MdButtonModule,
    MdButtonToggleModule,
    MdIconModule,
    MdToolbarModule,
    MdSidenavModule,
    MdListModule,
    MdSliderModule
  ],
  declarations: []
})
export class DashMaterialModule { }
