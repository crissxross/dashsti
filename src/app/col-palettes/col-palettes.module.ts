import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ColPalettesRoutingModule } from './col-palettes-routing.module';

import { ColPaletteComponent } from './col-palette.component';
import { HanColorsComponent } from './han-colors/han-colors.component';

@NgModule({
  imports: [
    CommonModule,
    ColPalettesRoutingModule
  ],
  declarations: [
    ColPaletteComponent,
    HanColorsComponent
  ]
})
export class ColPalettesModule { }
