import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
// import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';

import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';

import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';

import { DashboardModule } from './dashboard/dashboard.module';

import { SceneComponent } from './scene/scene.component';
import { NpcComponent } from './scene/npc.component';
import { ProtagComponent } from './scene/protag.component';
import { AppRoutingModule, routableComponents } from './app-routing.module';
import { DashSceneComponent } from './dash-scene/dash-scene.component';


@NgModule({
  declarations: [
    AppComponent,
    SceneComponent,
    NavComponent,
    NpcComponent,
    ProtagComponent,
    DashSceneComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    SharedModule,
    // FlexLayoutModule,
    DashboardModule,
    StoreModule.provideStore(reducers),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
