import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Path} from '../path';
import {PathService} from '../path.service';
import {Step} from '../step';
import {StepService} from '../step.service';
import {UntypedFormGroup, UntypedFormBuilder, UntypedFormArray, UntypedFormControl, ValidatorFn} from '@angular/forms';
import {Task} from "../task";

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  path: Path;
  step: Step;
  form: UntypedFormGroup = new UntypedFormGroup({});
  steps: Step[] = [];
  selectedStepIds: number[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private pathService: PathService,
              private stepService: StepService,
              private fb: UntypedFormBuilder) {
  }

  ngOnInit() {
    const slug = String(this.route.snapshot.paramMap.get('slug'));
    this.pathService.getPathBySlug(slug).subscribe((h => this.path = h))
    if (this.path) {
      sessionStorage.setItem('selectedPathId', this.path.id.toString())
    } else {
      this.router.navigate(['/']);
    }

    try {
      this.selectedStepIds = JSON.parse("[" + sessionStorage.getItem('selectedStepIds') + "]");
    } catch (e) {
      sessionStorage.setItem('selectedStepIds', '')
      sessionStorage.setItem('selectedTaskIds', '')
      this.selectedStepIds = []
    }

    this.stepService.getPathSteps(this.path).subscribe(step => this.steps = step);

    this.initForm()
  }

  initForm() {
    const steps = new UntypedFormArray([], minSelectedCheckboxes(1));
    this.steps.forEach((step: Step) => {
      steps.push(
        new UntypedFormGroup({
          id: new UntypedFormControl(step.id),
          name: new UntypedFormControl(step.name),
          checked: new UntypedFormControl(this.selectedStepIds.indexOf(step.id) >= 0),
          rationale: new UntypedFormControl(step.rationale)
        })
      );
    });
    this.form = this.fb.group({
      steps: steps,
    })
  }

  get stepFormArray(): UntypedFormArray {
    return this.form.get('steps') as UntypedFormArray;
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
  const validator: ValidatorFn = (formArray: UntypedFormArray) => {
    const totalSelected = formArray.controls
      .map(control => control.value.checked)
      .reduce((prev, next) => next ? prev + next : prev, 0);
    return totalSelected >= min ? null : {required: true};
  };
  return validator;
}


