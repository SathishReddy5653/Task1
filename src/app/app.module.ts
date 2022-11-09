import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { TabularComponent } from './tabular/tabular.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    TabularComponent,

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
