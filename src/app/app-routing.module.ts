import {NgModule} from '@angular/core';
import {RouterModule, Routes, UrlSegment} from '@angular/router';

import {PathsComponent} from "./paths/paths.component";
import {StepsComponent} from './steps/steps.component';

const routes: Routes = [
  { path: '', redirectTo: '/paths', pathMatch: 'full' },
  {path: 'paths', component: PathsComponent},
  {path: 'paths/:slug/steps', component: StepsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
