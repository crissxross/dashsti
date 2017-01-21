import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

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
    FormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    FlexLayoutModule.forRoot(),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
