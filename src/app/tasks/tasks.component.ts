import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PathService} from '../path.service';
import {StepService} from '../step.service';
import {TaskService} from '../task.service';
import {Path} from '../path';
import {Step} from '../step';
import {Task} from '../task';

import {FormGroup, FormBuilder, FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  path: Path | undefined;
  step: Step | undefined;
  form: FormGroup = new FormGroup({});
  steps: Step[] = [];
  tasks: Task[] = [];
  selectedStepIds: number[] = [];
  selectedTaskIds: number[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private pathService: PathService,
              private stepService: StepService,
              private taskService: TaskService,
              private fb: FormBuilder) {}

  ngOnInit() {
    const slug = String(this.route.snapshot.paramMap.get('slug'));
    this.path = this.pathService.getPathBySlug(slug)
    if (!this.path) {
      this.router.navigate(['/', {}]);
    }

    try {
      this.selectedStepIds = JSON.parse("[" + sessionStorage.getItem('selectedStepIds') + "]");
    } catch (e) {
      sessionStorage.setItem('selectedStepIds', '')
      this.selectedStepIds = []
    }
    if (!this.selectedStepIds.length) {
      this.router.navigate(['/paths', this.path.slug, 'steps']);
    }
    this.stepService.getSteps(this.selectedStepIds).subscribe(step => this.steps = step);
    this.step = this.steps[0]

    this.taskService.getTasksByStepIds(this.selectedStepIds).forEach(task => {
      task.checked = false;
      this.tasks.push(task);
    })
    this.initForm()
  }

  initForm() {
    const steps = new FormArray([]);
    this.steps.forEach((step: Step) => {
      const tasks = new FormArray([]);
      this.tasks.forEach((task: Task) => {
        if (task.step_id === step.id)
          tasks.push(new FormGroup({
            id: new FormControl(task.id),
            name: new FormControl(task.name),
            checked: new FormControl(task.checked)
          }))
      });
      steps.push(
        new FormGroup({
          id: new FormControl(step.id),
          name: new FormControl(step.name),
          checked: new FormControl(step.checked),
          tasks,
        })
      );
    });

    this.form = this.fb.group({
      steps: steps,
    })

    this.setListeners();
  }

  get stepFormArray(): FormArray {
    return this.form.get('steps') as FormArray;
  }

  getStepTaskArray(stepIndex: number): FormArray {
    return this.stepFormArray.at(stepIndex).get('tasks') as FormArray;
  }

  private setListeners(): void {
    this.stepFormArray.controls.forEach((stepGroup: FormGroup) => {
      stepGroup.controls['checked'].valueChanges.subscribe((value) => {
        (
          (stepGroup.controls['tasks'] as FormArray).controls as FormGroup[]
        ).forEach((taskGroup: FormGroup) => {
          taskGroup.controls['checked'].setValue(value);
        });
      });
    });
  }
}
