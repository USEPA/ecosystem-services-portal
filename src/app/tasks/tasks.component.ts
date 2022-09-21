import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {UntypedFormGroup, UntypedFormBuilder, UntypedFormArray, UntypedFormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {PathService} from '../path.service';
import {StepService} from '../step.service';
import {TaskService} from '../task.service';
import {ToolService} from '../tool.service';
import {Path} from '../path';
import {Step} from '../step';
import {Task} from '../task';
import {Tool} from "../tool";


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TasksComponent implements OnInit {
  path: Path | undefined;
  step: Step | undefined;
  form: UntypedFormGroup = new UntypedFormGroup({});
  steps: Step[] = [];
  tasks: Task[] = [];
  selectedSteps: Step[] = [];
  selectedTasks: Task[] = [];
  selectedStepBreadcrumbLabel: String = '';

  constructor(private router: Router,
              private route: ActivatedRoute,
              private pathService: PathService,
              private stepService: StepService,
              private taskService: TaskService,
              private toolService: ToolService,
              private fb: UntypedFormBuilder) {
  }

  ngOnInit() {
    this.pathService.getPathBySlug(this.route.snapshot.paramMap.get('slug')).subscribe(path => this.path = path)
    if (!this.path) {
      this.router.navigate(['/']);
    }
    try {
      let selectedStepIds = JSON.parse("[" + sessionStorage.getItem('selectedStepIds') + "]");
      this.stepService.getSteps(selectedStepIds).subscribe(steps => this.selectedSteps = steps)
    } catch (e) {
      sessionStorage.setItem('selectedStepIds', '')
      this.selectedSteps = []
    }
    if (!this.selectedSteps[0]) {
      this.router.navigate(['/']);
    }
    try {
      var selectedTaskIds = JSON.parse("[" + sessionStorage.getItem('selectedTaskIds') + "]");
      this.taskService.getTasks().subscribe(tasks => tasks.forEach(task => selectedTaskIds.indexOf(task.id) > -1 ? this.selectedTasks.push(task) : null))
    } catch (e) {
      sessionStorage.setItem('selectedTaskIds', '')
      this.selectedTasks = []
    }
    this.selectedStepBreadcrumbLabel = this.selectedSteps[0].name + ((this.selectedSteps.length > 1) ? '...' : '');

    this.taskService.getStepTasks(this.selectedSteps).subscribe(tasks =>
      tasks.forEach(task => {
        task.checked = selectedTaskIds.find(x => x === task.id) > 0;
        this.tasks.push(task);
      }))

    this.selectedTasks = this.selectedTasks.filter(task => this.tasks.map(task => task.id).includes(task.id))
    this.initForm()
  }

  initForm() {
    const steps = new UntypedFormArray([]);
    this.selectedSteps.forEach((step: Step) => {
      const tasks = new UntypedFormArray([]);
      this.tasks.forEach((task: Task) => {
        if (task.step === step)
          tasks.push(new UntypedFormGroup({
            id: new UntypedFormControl(task.id),
            name: new UntypedFormControl(task.name),
            checked: new UntypedFormControl(task.checked)
          }))
      });
      steps.push(
        new UntypedFormGroup({
          id: new UntypedFormControl(step.id),
          name: new UntypedFormControl(step.name),
          checked: new UntypedFormControl(step.checked),
          tasks,
        })
      );
    });

    this.form = this.fb.group({
      steps: steps,
    })

    this.setListeners();
  }

  get matchingTools(): Tool[] {
    let tools: Tool[] = []
    this.toolService.getTaskTools(this.selectedTasks).subscribe(h => tools = h)
    return tools
  }

  selectTool(tool: Tool) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/tools', tool.matching_task.id, tool.slug], {}));
    window.open(url, '_blank');
  }

  get stepFormArray(): UntypedFormArray {
    return this.form.get('steps') as UntypedFormArray;
  }

  getStepTaskArray(stepIndex: number): UntypedFormArray {
    return this.stepFormArray.at(stepIndex).get('tasks') as UntypedFormArray;
  }

  setSelectedTasks(): void {
    this.selectedTasks.length = 0;
    let selectedTaskIds: number[] = []
    this.stepFormArray.controls.forEach((stepGroup: UntypedFormGroup, index) => {
      this.getStepTaskArray(index).controls.forEach((taskGroup: UntypedFormGroup) => {
        if (taskGroup.controls['checked'].value) selectedTaskIds.push(taskGroup.controls['id'].value);
      })
    });
    this.taskService.getTasks().subscribe((tasks) => {
      tasks.forEach((task) => {
        if (selectedTaskIds.indexOf(task.id) > -1) this.selectedTasks.push(task);
      })
    })

    sessionStorage.setItem('selectedTaskIds', selectedTaskIds.toString())
  }

  private setListeners(): void {
    this.stepFormArray.controls.forEach((stepGroup: UntypedFormGroup) => {
      stepGroup.controls['checked'].valueChanges.subscribe((value) => {
        (
          (stepGroup.controls['tasks'] as UntypedFormArray).controls as UntypedFormGroup[]
        ).forEach((taskGroup: UntypedFormGroup) => {
          taskGroup.controls['checked'].setValue(value);
        });
        this.setSelectedTasks();
      });
    });
  }
}
