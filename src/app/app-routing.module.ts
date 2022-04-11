import {NgModule} from '@angular/core';
import {RouterModule, Routes, UrlSegment} from '@angular/router';

import {PathsComponent} from "./paths/paths.component";
import {StepsComponent} from './steps/steps.component';
import {TasksComponent} from './tasks/tasks.component';
import {ToolDetailComponent} from "./tool-detail/tool-detail.component";

const routes: Routes = [
  {path: '', redirectTo: '/paths', pathMatch: 'full'},
  {path: 'paths', component: PathsComponent},
  {path: 'paths/:slug/steps', component: StepsComponent},
  {path: 'paths/:slug/steps/tasks', component: TasksComponent},
  {path: 'tools/:task_id/:slug', component: ToolDetailComponent},
  {path: 'tools/:slug', component: ToolDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
