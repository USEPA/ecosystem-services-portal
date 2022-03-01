import {NgModule} from '@angular/core';
import {RouterModule, Routes, UrlSegment} from '@angular/router';

import {PathsComponent} from "./paths/paths.component";
import {StepsComponent} from './steps/steps.component';
import {TasksComponent} from './tasks/tasks.component';

const routes: Routes = [
  {path: '', redirectTo: '/paths', pathMatch: 'full'},
  {path: 'paths', component: PathsComponent, data: {animation:'PathsPage'}},
  {path: 'paths/:slug/steps/tasks', component: TasksComponent, data: {animation:'TasksPage'}},
  {path: 'paths/:slug/steps', component: StepsComponent, data: {animation:'StepsPage'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
