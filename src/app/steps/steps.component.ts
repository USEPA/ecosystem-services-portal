import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Path} from '../path';
import {PathService} from '../path.service';
import {Step} from '../step';
import {StepService} from '../step.service';
import {ReactiveFormsModule, FormGroup, FormBuilder, FormArray, FormControl} from '@angular/forms';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.css']
})
export class StepsComponent implements OnInit {
  path: Path | undefined;
  stepGroup: FormGroup;
  steps: Step[] = [];
  selectedSteps: Step[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private pathService: PathService,
              private stepService: StepService,
              private fb: FormBuilder) {
    const slug = String(this.route.snapshot.paramMap.get('slug'));
    this.path = this.pathService.getPathBySlug(slug)
    if (!this.path) {
      this.router.navigate(['/', {}]);
    }

    this.stepGroup = this.fb.group({
      steps: this.fb.array([])
    });
  }

  get controls(): FormArray {
    return this.stepGroup.get('steps') as FormArray;
  };

  ngOnInit() {
    if (this.path) {
      this.stepService.getStepsByPath(this.path)
        .subscribe(step => this.steps = step);
      this.steps.forEach(step => this.controls.push(new FormControl()))
    }
  }

  onCheckboxChange(event: any) {
    const selectedStep = event.source.value;
    if (event.checked) {
      this.selectedSteps.push(selectedStep);
    } else {
      this.selectedSteps.forEach((step, index, array) => {
        if (step === selectedStep) array.splice(index, 1);
      });
    }
    }

    submit() {
      console.log(this.stepGroup.value);
    }
  }
