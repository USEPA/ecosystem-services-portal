import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Path} from '../path';
import {PathService} from '../path.service';
import {Step} from '../step';
import {StepService} from '../step.service';
import {FormGroup, FormBuilder, FormArray, FormControl, ValidatorFn} from '@angular/forms';
import {Task} from "../task";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  path: Path;
  step: Step;
  form: FormGroup = new FormGroup({});
  steps: Step[] = [];
  selectedStepIds: number[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private pathService: PathService,
              private stepService: StepService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    const slug = String(this.route.snapshot.paramMap.get('slug'));
    this.path = this.pathService.getPathBySlug(slug)
    if (this.path) {
      sessionStorage.setItem('selectedPathId', this.path.id.toString())
    } else {
      this.router.navigate(['/', {}]);
    }

    try {
      this.selectedStepIds = JSON.parse("[" + sessionStorage.getItem('selectedStepIds') + "]");
    } catch (e) {
      sessionStorage.setItem('selectedStepIds', '')
      this.selectedStepIds = []
    }

    this.stepService.getStepsByPath(this.path).subscribe(step => this.steps = step);

    this.initForm()
  }

  initForm() {
    const steps = new FormArray([], minSelectedCheckboxes(1));
    this.steps.forEach((step: Step) => {
      steps.push(
        new FormGroup({
          id: new FormControl(step.id),
          name: new FormControl(step.name),
          checked: new FormControl(this.selectedStepIds.indexOf(step.id) >= 0),
          rationale: new FormControl(step.rationale)
        })
      );
    });
    this.form = this.fb.group({
      steps: steps,
    })
  }

  get stepFormArray(): FormArray {
    return this.form.get('steps') as FormArray;
  }

  submit() {
    this.selectedStepIds = this.form.value.steps
      .map((step, i) => step.checked ? step.id : null)
      .filter(v => v !== null);
    sessionStorage.setItem('selectedStepIds', this.selectedStepIds.toString())
    this.router.navigate(['/paths', this.path.slug, 'steps', 'tasks', {}]);
  }
}

function minSelectedCheckboxes(min = 1) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value.checked)
      .reduce((prev, next) => next ? prev + next : prev, 0);
    return totalSelected >= min ? null : {required: true};
  };
  return validator;
}


