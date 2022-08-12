import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './modules/auto-migration/main-page/main-page.component';
import { LoginPageComponent } from './modules/login/login-page/login-page.component';
import { MigrationViewComponent } from './modules/migration/migration-view/migration-view.component';
import { ListServicesComponent } from './modules/service-selection/list-services/list-services.component';
import { ProgressCardComponent } from './shared/component/progress-card/progress-card.component';


const routes: Routes = [
  { path: 'login', component: LoginPageComponent},
  { path: 'migration', component: MainPageComponent},
  { path: 'services', component: ListServicesComponent},
  { path: 'services/migration/:appid/:serviceid', component: MigrationViewComponent},
  { path: 'services/migration/:appid/:serviceid/:partitionid', component: MigrationViewComponent}
  // { path: 'manualmigration', component: ManualMigrationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
