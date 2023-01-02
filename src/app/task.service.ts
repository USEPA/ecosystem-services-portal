import {Injectable} from '@angular/core';
import * as data from '../assets/tasks.json';
import {Observable, of} from 'rxjs';
import {Task} from "./task";
import {Tool} from "./tool";
import {Step} from "./step";
import {StepService} from "./step.service";
import {ToolService} from "./tool.service";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private dataRows = (data as any).default;
  tasks: Task[] = [];

  constructor(private toolService: ToolService,
              private stepService: StepService) {
    for (let dataRow of this.dataRows) {
      this.stepService.getStep(dataRow.step_id as number).subscribe(step => dataRow.step = step);
      this.toolService.getTools(dataRow.tool_ids as number[]).subscribe(tools => dataRow.tools = tools);
      this.tasks.push(<Task>{...dataRow});
    }
  }

  getTask(id: number): Observable<Task> {
    const task = this.tasks.find(h => h.id === id)!;
    return of(task);
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  getStepTasks(steps: Step[]): Observable<Task[]> {
    return of(this.tasks.filter(h => steps.indexOf(h.step) >= 0)!);
  }

  getToolTasks(tool: Tool): Observable<Task[]> {
    return of(this.tasks.filter(h => h.tools.indexOf(tool) >= 0)!);
  }
}

