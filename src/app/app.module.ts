import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from './modules/material.module';
import { AppRoutingModule } from './app-routing.module';
import { CoreComponentsModule } from './core/components/core-components.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './features/components/layout/layout.component';
import { LoginComponent } from './features/components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    AppRoutingModule,
    CoreComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
