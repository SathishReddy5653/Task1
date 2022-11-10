import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { TabularComponent } from './profile/tabular/tabular.component';

import { AppRoutingModule } from './app-routing.module';
import { ProfileModule } from './profile/profile.module';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TabularComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ProfileModule,
    AppRoutingModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
