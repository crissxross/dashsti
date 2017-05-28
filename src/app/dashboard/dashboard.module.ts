import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { ActorvizComponent } from './actorviz/actorviz.component';
import { EmovizComponent } from './emoviz/emoviz.component';
import { Emoviz2Component } from './emoviz2/emoviz2.component';

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    ActorvizComponent,
    EmovizComponent,
    Emoviz2Component
  ]
})
export class DashboardModule { }
