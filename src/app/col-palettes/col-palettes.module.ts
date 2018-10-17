import { NgModule } from '@angular/core';
// import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ROUTES } from './col-palettes.routes';

import { ColPaletteComponent } from './col-palette.component';
import { HanColorsComponent } from './han-colors/han-colors.component';
import { HannahColsComponent } from './hannah-cols/hannah-cols.component';
import { JoelColsComponent } from './joel-cols/joel-cols.component';
import { SarahColsComponent } from './sarah-cols/sarah-cols.component';

@NgModule({
  imports: [
    // CommonModule,
    SharedModule,
    RouterModule.forChild(ROUTES)
  ],
  declarations: [
    ColPaletteComponent,
    HanColorsComponent,
    HannahColsComponent,
    JoelColsComponent,
    SarahColsComponent
  ]
})
export class ColPalettesModule { }
