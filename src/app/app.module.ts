import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {SharedModule} from './shared/shared.module';
import {FeatureModule} from './feature/feature.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgbModalModule,
    HttpClientModule,
    SharedModule,
    FeatureModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
