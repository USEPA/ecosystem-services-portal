import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import * as tools from '../assets/tools.json';
import * as tasks from '../assets/tasks.json';
import * as steps from '../assets/steps.json';
import {Tool} from "./tool";
import {Task} from "./task";
import {Step} from './step'

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  tools: Tool[] = (tools as any).default;
  tasks: Task[] = (tasks as any).default;
  steps: Step[] = (steps as any).default;

  constructor() {
  }

  getTool(id: number): Observable<Tool> {
    const tool = this.tools.find(h => h.id === id)!;
    return of(tool);
  }

  getTools(): Observable<Tool[]> {
    return of(this.tools);
  }

  getToolsByTaskIds(task_ids: number[]): Tool[] {
    let selectedToolIds: number[] = this.tasks.filter(h => task_ids.indexOf(h.id) >= 0).map(task => task.tool_id)
    let selectedStepIds: number[] = this.tasks.filter(h => task_ids.indexOf(h.id) >= 0).map(task => task.step_id)
    let matchingTools: Tool[] = []
    for (let i: number = 0; i < selectedToolIds.length; i++) {
      const matchingTool = <Tool>{
        id: selectedToolIds[i],
        short_name: this.tools.find(h => h.id === selectedToolIds[i]).short_name,
        matching_step_name: this.steps.find(h => h.id === selectedStepIds[i]).name
      }
      matchingTools.push(matchingTool);
    }
    return matchingTools;
  }

}
