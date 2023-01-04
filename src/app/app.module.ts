import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MdePopoverModule} from '@material-extended/mde';

import {AppComponent} from './app.component';
import {PathsComponent} from './paths/paths.component';
import {StepsComponent} from './steps/steps.component';
import {TasksComponent} from './tasks/tasks.component';
import {TaskToolsComponent, TaskToolsComponentDialog} from './task-tools/task-tools.component';
import {PathToolsComponent, PathToolsComponentDialog} from './path-tools/path-tools.component';
import {ToolDetailComponent} from './tool-detail/tool-detail.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule, UrlSegment} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SelectAllComponent} from './select-all.component';
import {MatTableModule} from "@angular/material/table";
import {MatExpansionModule} from "@angular/material/expansion";
import {ProgressBarComponent} from "./progress-bar.component";
import {MatDialogModule} from "@angular/material/dialog";
import {DragDropModule} from "@angular/cdk/drag-drop";

@NgModule({
  declarations: [
    AppComponent,
    PathsComponent,
    StepsComponent,
    TasksComponent,
    TaskToolsComponent,
    TaskToolsComponentDialog,
    PathToolsComponent,
    PathToolsComponentDialog,
    ToolDetailComponent,
    SelectAllComponent,
    ProgressBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatTableModule,
    MatDialogModule,
    DragDropModule,
    MdePopoverModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {
        matcher: (url) => {
          let stepSegment = url.map(e => e.path).indexOf('steps')
          if (stepSegment > 0) {
            return {
              consumed: url,
              posParams: {
                slug: new UrlSegment(url[stepSegment - 1].path, {})
              }
            };
          }
          return null;
        },
        component: PathsComponent
      }], {scrollPositionRestoration: 'enabled'}),
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule {
}
