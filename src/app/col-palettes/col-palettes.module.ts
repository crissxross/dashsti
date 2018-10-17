import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ROUTES } from './col-palettes.routes';

import { ColPaletteComponent } from './col-palette.component';
import { HanHexColorsComponent } from './han-hex-colors/han-hex-colors.component';
import { HanSvgColsComponent } from './han-svg-cols/han-svg-cols.component';
import { JoeSvgColsComponent } from './joe-svg-cols/joe-svg-cols.component';
import { SarSvgColsComponent } from './sar-svg-cols/sar-svg-cols.component';
import { HanColsTheme1Component } from './han-cols-theme1/han-cols-theme1.component';
import { ActorsColsComponent } from './actors-cols/actors-cols.component';
import { SarColsTheme1Component } from './sar-cols-theme1/sar-cols-theme1.component';
import { JoeColsTheme1Component } from './joe-cols-theme1/joe-cols-theme1.component';

@NgModule({
  imports: [
    // CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ColPaletteComponent,
    HanHexColorsComponent,
    HanSvgColsComponent,
    JoeSvgColsComponent,
    SarSvgColsComponent,
    HanColsTheme1Component,
    ActorsColsComponent,
    SarColsTheme1Component,
    JoeColsTheme1Component
  ]
})
export class ColPalettesModule { }
