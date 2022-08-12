import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MigrationViewComponent } from './migration-view/migration-view.component';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ProgressCardComponent } from './progress-card/progress-card.component';


@NgModule({
  declarations: [
    MigrationViewComponent,
    ProgressCardComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule
  ],
  exports : [
    MigrationViewComponent
  ]
})
export class MigrationModule { }
