import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PartitionProgressComponent } from './partition-progress/partition-progress.component';
import { MainPageComponent } from './main-page/main-page.component';



@NgModule({
  declarations: [
    PartitionProgressComponent,
    MainPageComponent
  ],
  imports: [
    CommonModule,
    NgModule,
    BrowserModule
  ]
})
export class AutoMigrationModule { }
