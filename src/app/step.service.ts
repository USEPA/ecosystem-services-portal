import {Injectable} from '@angular/core';
import {Step} from "./step";
import * as data from '../assets/steps.json';
import {Observable, of} from 'rxjs';
import {Path} from "./path";

@Injectable({
  providedIn: 'root'
})
export class StepService {

  steps: Step[] = (data as any).default;

  constructor() {
  }

  getStep(id: number): Observable<Step> {
    const step = this.steps.find(h => h.id === id)!;
    return of(step);
  }

  getSteps(id: number[]): Observable<Step[]> {
    const steps = this.steps.filter(h => id.indexOf(h.id) >= 0)!;
    return of(steps);
  }

  getStepsByPath(path: Path): Observable<Step[]> {
    const steps = this.steps.filter(h => h.path_id === path.id)!;
    return of(steps);
  }
}

