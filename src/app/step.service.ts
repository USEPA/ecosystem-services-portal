import {Injectable} from '@angular/core';
import {Step} from "./step";
import * as data from '../assets/steps.json';
import {Observable, of} from 'rxjs';
import {Path} from "./path";
import {PathService} from "./path.service";

@Injectable({
  providedIn: 'root'
})
export class StepService {

  private dataRows = (data as any).default;
  steps: Step[] = [];

  constructor(private pathService: PathService) {
    for (let dataRow of this.dataRows) {
      this.pathService.getPath(dataRow.path_id as number).subscribe(path => dataRow.path = path);
      this.steps.push(<Step>{...dataRow});
    }
  }

  getStep(id: number): Observable<Step> {
    return of(this.steps.find(h => h.id === id)!);
  }

  getSteps(id: number[]): Observable<Step[]> {
    return of(this.steps.filter(h => id.indexOf(h.id) >= 0)!);
  }

  getPathSteps(path: Path): Observable<Step[]> {
    return of(this.steps.filter(h => h.path === path)!);
  }
}
