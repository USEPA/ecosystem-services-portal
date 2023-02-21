import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Tool} from "../tool";
import {Path} from "../path";
import {Task} from "../task";
import {ToolService} from "../tool.service";
import {PathService} from "../path.service";
import {TaskService} from "../task.service";
import {Step} from "../step";
import {StepService} from "../step.service";
import {of} from "rxjs";

@Component({
  selector: 'app-tool-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.scss']
})
export class ToolDetailComponent implements OnInit {
  tool: Tool;
  task: Task;
  step: Step;
  path: Path;
  pathSteps: Path[] = []
  objectKeys = Object.keys;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private toolService: ToolService,
              private taskService: TaskService,
              private stepService: StepService,
              private pathService: PathService,) {
  }
  @Input() dialogTool: Tool = null;
  @Input() dialogPath: Path = null;

  ngOnInit() {
    const slug = String(this.route.snapshot.paramMap.get('slug'));
    this.path = this.dialogPath ?? undefined;
    this.tool = this.dialogTool ?? this.toolService.getToolBySlug(slug);
    if (this.tool !== undefined) {
      const task_id = this.tool.matching_task?.id ?? Number(this.route.snapshot.paramMap.get('task_id'));
      this.taskService.getTask(task_id).subscribe(task => this.task = task);
      if (this.task !== undefined) {
        of(this.task.step).subscribe(step => this.step = step);
        of(this.step.path).subscribe(path => this.path = path)
      }
      sessionStorage.setItem('selectedToolId', this.tool.id.toString())
      this.getPathSteps();
      this.getToolTasks();
    } else {
      this.router.navigate(['/']);
    }
  }

  getPathSteps(): void {
    this.pathService.getPaths().subscribe(paths => this.pathSteps = paths.slice(0, 3));
    for (let i in this.tool.related_steps) {
      let stepArray: string[] = []
      for (let l of this.tool.related_steps[i]) {
        stepArray.push(l)
      }
      this.pathSteps[parseInt(i) - 1]!.related_steps = stepArray
    }
  }

  getToolTasks(): void {
    let tasks: Task[] =[];
    this.taskService.getToolTasks(this.tool).subscribe(h => tasks = h);
    let taskNames = tasks.map(task => task.name);
    this.tool.detail["Tasks it can help with:"] =
      taskNames.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      })
  }
}
