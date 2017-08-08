import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { Emoviz1Component } from './emoviz1/emoviz1.component';
import { Emoviz2Component } from './emoviz2/emoviz2.component';
import { Emoviz2aComponent } from './emoviz2a/emoviz2a.component';
import { Emoviz3Component } from './emoviz3/emoviz3.component';
import { Emoviz3aComponent } from './emoviz3a/emoviz3a.component';
import { Emoviz3bComponent } from './emoviz3b/emoviz3b.component';
import { Emoviz4Component } from './emoviz4/emoviz4.component';
import { Emoviz5Component } from './emoviz5/emoviz5.component';
import { Emoviz6Component } from './emoviz6/emoviz6.component';
import { Emoviz7Component } from './emoviz7/emoviz7.component';
import { EmovizxComponent } from './emovizx/emovizx.component';
import { EmovizyComponent } from './emovizy/emovizy.component';
import { EmovizzComponent } from './emovizz/emovizz.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent,
    children: [
      {
        path: 'emoviz1', component: Emoviz1Component
      },
      {
        path: 'emoviz2', component: Emoviz2Component
      },
      {
        path: 'emoviz2a', component: Emoviz2aComponent
      },
      {
        path: 'emoviz3', component: Emoviz3Component
      },
      {
        path: 'emoviz3a', component: Emoviz3aComponent
      },
      {
        path: 'emoviz3b', component: Emoviz3bComponent
      },
      {
        path: 'emoviz4', component: Emoviz4Component
      },
      {
        path: 'emoviz5', component: Emoviz5Component
      },
      {
        path: 'emoviz6', component: Emoviz6Component
      },
      {
        path: 'emoviz7', component: Emoviz7Component
      },
      {
        path: 'emovizx', component: EmovizxComponent
      },
      {
        path: 'emovizy', component: EmovizyComponent
      },
      {
        path: 'emovizz', component: EmovizzComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule { }

// export const routedComponents = [DashboardComponent];

// NOTE: the routedComponents export was added by default when
// routing module code was generated from Angular snippet (JPapa)
// But why/when would I need to export routedComponents?

