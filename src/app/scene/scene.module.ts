import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { SceneComponent } from './scene.component';
import { NpcComponent } from './npc.component';
import { ProtagComponent } from './protag.component';

@NgModule({
  imports: [
    SharedModule
  ],
  exports: [
    SharedModule,
    SceneComponent,
    NpcComponent,
    ProtagComponent
  ],
  declarations: [
    SceneComponent,
    NpcComponent,
    ProtagComponent
  ]
})
export class SceneModule { }
