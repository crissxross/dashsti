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
import { DashboardModule } from './dashboard/dashboard.module';
import { SceneModule } from './scene/scene.module';
import { ColPalettesModule } from './col-palettes/col-palettes.module';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DashSceneComponent } from './dash-scene/dash-scene.component';


import { AppRoutingModule } from './app-routing.module';
// import { AppRoutingModule, routableComponents } from './app-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashSceneComponent,
    // HanColorsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    SharedModule,
    // FlexLayoutModule,
    DashboardModule,
    SceneModule,
    ColPalettesModule,
    // StoreModule.provideStore(reducers),
    StoreModule.forRoot(reducers),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
