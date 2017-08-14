import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
// import { ActorvizComponent } from './actorviz/actorviz.component';
import { Emoviz1Component } from './emoviz1/emoviz1.component';
import { Emoviz2Component } from './emoviz2/emoviz2.component';
import { Emoviz2aComponent } from './emoviz2a/emoviz2a.component';
import { Emoviz3Component } from './emoviz3/emoviz3.component';
import { Emoviz4Component } from './emoviz4/emoviz4.component';
import { EmovizxComponent } from './emovizx/emovizx.component';
import { EmovizyComponent } from './emovizy/emovizy.component';
import { EmovizzComponent } from './emovizz/emovizz.component';
import { Emoviz3aComponent } from './emoviz3a/emoviz3a.component';
import { BlobMorpherComponent } from './emoviz4/blob-morpher/blob-morpher.component';
import { Emoviz5Component } from './emoviz5/emoviz5.component';
import { EmoWavlineComponent } from './emobits/emo-wavline.component';
import { EmoZZlineComponent } from './emobits/emo-zzline.component';
import { Emoviz3bComponent } from './emoviz3b/emoviz3b.component';
import { Emoviz6Component } from './emoviz6/emoviz6.component';
import { Emoviz7Component } from './emoviz7/emoviz7.component';
import { Emoviz7aComponent } from './emoviz7a/emoviz7a.component';
import { Emoviz7bComponent } from './emoviz7b/emoviz7b.component';
import { Emoviz7cComponent } from './emoviz7c/emoviz7c.component';
import { Emoviz8Component } from './emoviz8/emoviz8.component';
import { Emoviz9Component } from './emoviz9/emoviz9.component';
import { Viz9Component } from './emoviz9/viz9.component';
import { Emoviz10Component } from './emoviz10/emoviz10.component';
import { Viz10Component } from './emoviz10/viz10.component';
import { Svg10Component } from './emoviz10/svg10.component';

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
    Emoviz2aComponent,
    Emoviz3Component,
    Emoviz4Component,
    EmovizxComponent,
    EmovizyComponent,
    EmovizzComponent,
    Emoviz3aComponent,
    BlobMorpherComponent,
    Emoviz5Component,
    EmoWavlineComponent,
    EmoZZlineComponent,
    Emoviz3bComponent,
    Emoviz6Component,
    Emoviz7Component,
    Emoviz7aComponent,
    Emoviz7bComponent,
    Emoviz7cComponent,
    Emoviz8Component,
    Emoviz9Component,
    Viz9Component,
    Emoviz10Component,
    Viz10Component,
    Svg10Component
  ]
})
export class DashboardModule { }
