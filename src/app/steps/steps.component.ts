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
  path: Path;
  stepGroup: FormGroup;
  steps: Step[] = [];
  selectedStepIds: Number[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private pathService: PathService,
              private stepService: StepService,
              private fb: FormBuilder) {
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

    this.stepGroup = this.fb.group({
      steps: this.fb.array([])
    });
  }

  get controls(): FormArray {
    return this.stepGroup.get('steps') as FormArray;
  };

  ngOnInit() {
    this.stepService.getStepsByPath(this.path)
      .subscribe(step => this.steps = step);
    this.steps.forEach(step => this.controls.push(new FormControl(this.selectedStepIds.indexOf(step.id) >= 0)))
  }

  onCheckboxChange(event: any) {
    const selectedStepId = event.source.value;
    if (event.checked) {
      this.selectedStepIds.push(selectedStepId);
    } else {
      this.selectedStepIds.forEach((step, index, array) => {
        if (step === selectedStepId) array.splice(index, 1);
      });
    }
  }

  submit() {
    sessionStorage.setItem('selectedStepIds', this.selectedStepIds.toString())
    this.router.navigate(['/paths', this.path.slug, 'steps', 'tasks', {}]);
  }
}
