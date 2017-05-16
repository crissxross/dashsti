import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import { DashMaterialModule } from './shared/dash-material.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SceneComponent } from './scene/scene.component';
import { NavComponent } from './nav/nav.component';
import { ActorvizComponent } from './actorviz/actorviz.component';
import { UicontrolsComponent } from './dashboard/uicontrols/uicontrols.component';
import { NpcComponent } from './scene/npc.component';
import { PlayerComponent } from './scene/player.component';
import { AppRoutingModule, routableComponents } from './app-routing.module';

// OR do this (like John Papa):
// declarations: [AppComponent, routableComponents]
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SceneComponent,
    NavComponent,
    ActorvizComponent,
    UicontrolsComponent,
    NpcComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    DashMaterialModule,
    FlexLayoutModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
