import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatSliderModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSliderModule
  ],
  declarations: []
})
export class DashMaterialModule { }
