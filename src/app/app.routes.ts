import { Routes } from '@angular/router';

import { DashSceneComponent } from './dash-scene/dash-scene.component';


export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dash-scene', component: DashSceneComponent },
  {
    path: 'col-palettes',
    loadChildren: './col-palettes/col-palettes.module#ColPalettesModule'
  }
];
