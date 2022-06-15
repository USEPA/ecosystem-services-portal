import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import * as tools from '../assets/tools.json';
import * as tasks from '../assets/tasks.json';
import * as steps from '../assets/steps.json';
import {Tool} from "./tool";
import {Task} from "./task";
import {Step} from './step'
import {PathService} from "./path.service";
import {Path} from "./path";

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  tools: Tool[] = (tools as any).default;
  tasks: Task[] = (tasks as any).default;
  steps: Step[] = (steps as any).default;
  pathService: PathService;

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
    let selectedToolIds: number[] = this.tasks.filter(h => task_ids.indexOf(h.id) > -1).map(task => task.tool_id)
    let selectedStepIds: number[] = this.tasks.filter(h => task_ids.indexOf(h.id) > -1).map(task => task.step_id)
    let matchingTools: Tool[] = []
    for (let i: number = 0; i < selectedToolIds.length; i++) {
      const matchingTool = <Tool>{
        id: selectedToolIds[i],
        slug: this.tools.find(h => h.id === selectedToolIds[i]).slug,
        short_name: this.tools.find(h => h.id === selectedToolIds[i]).short_name,
        matching_step: this.steps.find(h => h.id === selectedStepIds[i]),
        matching_task: this.tasks.find(h => h.id === task_ids[i])
      }
      matchingTools.push(matchingTool);
    }
    return matchingTools;
  }

  getToolBySlug(slug: string): Tool {
    return this.tools.find(h => isNaN(Number(slug)) ? h.slug === slug : h.id === Number(slug))!;
  }

  getToolsByPath(path: Path): Tool[] {
    let stepIds: number[] = this.steps.filter(h => h.path_id == path.id).map(step => step.id)
    let taskIds: number[] = this.tasks.filter(h => stepIds.indexOf(h.step_id) > -1).map(task => task.id)
    return this.getToolsByTaskIds(taskIds);
  }

}
