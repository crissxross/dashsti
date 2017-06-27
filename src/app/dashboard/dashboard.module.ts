import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
// import { ActorvizComponent } from './actorviz/actorviz.component';
import { Emoviz1Component } from './emoviz1/emoviz1.component';
import { Emoviz2Component } from './emoviz2/emoviz2.component';
import { Emoviz3Component } from './emoviz3/emoviz3.component';
import { Emoviz4Component } from './emoviz4/emoviz4.component';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    // ActorvizComponent,
    Emoviz1Component,
    Emoviz2Component,
    Emoviz3Component,
    Emoviz4Component
  ]
})
export class DashboardModule { }
