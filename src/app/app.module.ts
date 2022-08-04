import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './modules/login/login.module';
import { RefreshRateComponent } from './shared/component/refresh-rate/refresh-rate.component';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import { ProgressCardComponent } from './shared/component/progress-card/progress-card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatStepperModule} from '@angular/material/stepper';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ServiceSelectionModule } from './modules/service-selection/service-selection.module';
import {MatIconModule} from '@angular/material/icon'


//import { SidebarComponent } from './shared/component/sidebar/sidebar.component';
@NgModule({
  declarations: [
    AppComponent,
    RefreshRateComponent,
    ProgressCardComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    NgbModule,
    FormsModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatStepperModule,
    CommonModule,
    HttpClientModule,
    ServiceSelectionModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatStepperModule,
    CommonModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent],

})
export class AppModule { }
