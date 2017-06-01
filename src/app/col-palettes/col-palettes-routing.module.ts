import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColPaletteComponent } from './col-palette.component';
import { HanColorsComponent } from './han-colors/han-colors.component';

const routes: Routes = [
  {
    path: '', component: ColPaletteComponent,
    children: [
      {
        path: 'han-colors', component: HanColorsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColPalettesRoutingModule { }
