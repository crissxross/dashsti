import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { DashMaterialModule } from './shared/dash-material.module';
import { UicontrolsComponent } from './shared/uicontrols/uicontrols.component';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ActorvizComponent } from './actorviz/actorviz.component';
import { SceneComponent } from './scene/scene.component';
import { NpcComponent } from './scene/npc.component';
import { ProtagComponent } from './scene/protag.component';
import { AppRoutingModule, routableComponents } from './app-routing.module';
import { DashSceneComponent } from './dash-scene/dash-scene.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SceneComponent,
    NavComponent,
    ActorvizComponent,
    UicontrolsComponent,
    NpcComponent,
    ProtagComponent,
    DashSceneComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    DashMaterialModule,
    // FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
