import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuilderComponent } from './builder/builder.component';
import { WorkManagerComponent } from './work-manager/work-manager.component';

const routes: Routes = [
  {path:"builder", component: BuilderComponent},
  {path:"workmanager", component: WorkManagerComponent},
  { path: '',   redirectTo: '/builder', pathMatch: 'full' },
  { path: '**', component: BuilderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
