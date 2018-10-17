import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';

import { SharedModule } from './shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SceneModule } from './scene/scene.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { DashSceneComponent } from './dash-scene/dash-scene.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DashSceneComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    DashboardModule,
    SceneModule,
    // StoreModule.provideStore(reducers),
    StoreModule.forRoot(reducers),
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
