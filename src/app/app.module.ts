import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PortalComponent } from './portal/portal.component';
import { PathsComponent } from './paths/paths.component';
import { StepsComponent } from './steps/steps.component';
import { TasksComponent } from './tasks/tasks.component';
import { ToolsComponent } from './tools/tools.component';
import { ToolDetailComponent } from './tool-detail/tool-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    PortalComponent,
    PathsComponent,
    StepsComponent,
    TasksComponent,
    ToolsComponent,
    ToolDetailComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
