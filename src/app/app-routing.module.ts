import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashSceneComponent } from './dash-scene/dash-scene.component';
// import { HanColorsComponent } from './han-colors/han-colors.component';
import { ColPalettesModule } from './col-palettes/col-palettes.module';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dash-scene', component: DashSceneComponent },
  {
    path: 'col-palettes',
    loadChildren: 'app/col-palettes/col-palettes.module#ColPalettesModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

// NOTE: Why/when would I need to export routableComponents?
// export const routableComponents = [
//   DashSceneComponent
// ];
