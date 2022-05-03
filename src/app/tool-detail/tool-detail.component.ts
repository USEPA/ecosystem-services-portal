import {Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Tool} from "../tool";
import {Path} from "../path";
import {Task} from "../task";
import {ToolService} from "../tool.service";
import {PathService} from "../path.service";
import {TaskService} from "../task.service";
import {Step} from "../step";
import {StepService} from "../step.service";

@Component({
  selector: 'app-tool-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
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

  ngOnInit() {
    const slug = String(this.route.snapshot.paramMap.get('slug'));
    this.tool = this.toolService.getToolBySlug(slug);
    if (this.tool !== undefined) {
      const task_id = Number(this.route.snapshot.paramMap.get('task_id'));
      this.taskService.getTask(task_id).subscribe(task => this.task = task);
      if (this.task !== undefined) {
        this.stepService.getStep(this.task.step_id).subscribe(step => this.step = step);
        this.pathService.getPath(this.step.path_id).subscribe(path => this.path = path)
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
    let tasks: Task[] = this.taskService.getTasksByToolId(this.tool.id);
    let taskNames = tasks.map(task => task.name);
    this.tool.detail["Tasks it can help with:"] =
      taskNames.filter(function (elem, index, self) {
        return index === self.indexOf(elem);
      })
  }

  get toolDetails(): String {
    let detail = "<div class=\"grid mat-expansion-panel\">";
    for (let col1 of this.objectKeys(this.tool.detail)) {
      detail += "<div class=\"grid-row\">\n" +
        "    <div class=\"grid-col-3\"><b>" + col1 + "</b></div>"
      this.tool.detail[col1].forEach((value, index) => {
        if (col1 == "Level of effort needed:") {
          detail += "<div class=\"grid-col-4\">" + value[0] + "</div>\n" +
            "<div class=\"grid-col-5\">" + value[1] + "</div>\n";
        } else {
          detail += "<div class=\"grid-col-9\">" + value + "</div>\n"
        }
        detail += "</div>"
        if (index < this.tool.detail[col1].length - 1) {
          detail += "<div class=\"grid-row\"><div class=\"grid-col-3\"></div>"
        }
      })
    }
    detail += "</div>"
    return detail
  }

}
