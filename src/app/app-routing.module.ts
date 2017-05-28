import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashSceneComponent } from './dash-scene/dash-scene.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dash-scene', component: DashSceneComponent }
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
