import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
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

