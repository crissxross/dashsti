import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColPaletteComponent } from './col-palette.component';
import { HanColorsComponent } from './han-colors/han-colors.component';
import { HannahColsComponent } from './hannah-cols/hannah-cols.component';
import { JoelColsComponent } from './joel-cols/joel-cols.component';
import { SarahColsComponent } from './sarah-cols/sarah-cols.component';

const routes: Routes = [
  {
    path: '', component: ColPaletteComponent,
    children: [
      {
        path: 'hannah-cols', component: HannahColsComponent
      },
      {
        path: 'joel-cols', component: JoelColsComponent
      },
      {
        path: 'sarah-cols', component: SarahColsComponent
      },
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
