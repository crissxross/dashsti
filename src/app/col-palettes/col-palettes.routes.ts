import { Routes } from '@angular/router';

import { ColPaletteComponent } from './col-palette.component';
import { HanSvgColsComponent } from './han-svg-cols/han-svg-cols.component';
import { JoeSvgColsComponent } from './joe-svg-cols/joe-svg-cols.component';
import { SarSvgColsComponent } from './sar-svg-cols/sar-svg-cols.component';
import { HanHexColorsComponent } from './han-hex-colors/han-hex-colors.component';
import { ActorsColsComponent } from './actors-cols/actors-cols.component';
import { HanColsTheme1Component } from './han-cols-theme1/han-cols-theme1.component';
import { SarColsTheme1Component } from './sar-cols-theme1/sar-cols-theme1.component';
import { JoeColsTheme1Component } from './joe-cols-theme1/joe-cols-theme1.component';


export const ROUTES: Routes = [
  {
    path: '', component: ColPaletteComponent,
    children: [
      {
        path: '', redirectTo: 'actors-cols', pathMatch: 'full'
      },
      {
        path: 'actors-cols', component: ActorsColsComponent
      },
      {
        path: 'han-cols-theme1', component: HanColsTheme1Component
      },
      {
        path: 'sar-cols-theme1', component: SarColsTheme1Component
      },
      {
        path: 'joe-cols-theme1', component: JoeColsTheme1Component
      },
      {
        path: 'han-svg-cols', component: HanSvgColsComponent
      },
      {
        path: 'joe-svg-cols', component: JoeSvgColsComponent
      },
      {
        path: 'sar-svg-cols', component: SarSvgColsComponent
      },
      {
        path: 'han-hex-colors', component: HanHexColorsComponent
      },
    ]
  }
];
