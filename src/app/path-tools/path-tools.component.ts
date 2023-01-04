import {Component, Inject, OnInit, Optional, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Tool} from '../tool'
import {Path} from "../path";
import {ToolService} from "../tool.service";
import {ActivatedRoute} from "@angular/router";
import {PathService} from "../path.service";
import {Step} from "../step";
import {Task} from "../task";
import {StepService} from "../step.service";
import {TaskService} from "../task.service";

@Component({
  selector: 'app-path-tools',
  templateUrl: './path-tools.component.html',
  encapsulation: ViewEncapsulation.None
})
export class PathToolsComponent {
  path: Path;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private pathService: PathService,) {
    const slug = String(this.route.snapshot.paramMap.get('slug'));
    this.pathService.getPathBySlug(slug).subscribe(h => this.path = h)
  }

  openDialog() {
    this.dialog.open(PathToolsComponentDialog,
      {
        width: '1048px',
        data: {path: this.path}
      });
  }
}

@Component({
  templateUrl: './path-tools-dialog.component.html',
  styleUrls: ['./path-tools.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PathToolsComponentDialog implements OnInit {
  path: Path
  matchingTools: Tool[] = [];
  offset: number = 0;

  constructor(private toolService: ToolService,
              private taskService: TaskService,
              private stepService: StepService,
              public dialog: MatDialog,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.path = data.path
    let steps: Step[] = []
    let tasks: Task[] = []
    this.stepService.getPathSteps(this.path).subscribe(h => steps = h)
    this.taskService.getStepTasks(steps).subscribe(h => tasks = h)
    this.toolService.getTaskTools(tasks).subscribe(h => this.matchingTools = h)
    this.matchingTools.sort((a, b) => a.matching_step.id > b.matching_step.id ? 1 : -1)
    this.offset = this.matchingTools[0].matching_step.id - 1
  }

  ngOnInit(): void {
  }
}
