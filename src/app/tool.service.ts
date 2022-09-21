import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import * as data from "../assets/tools.json";
import {Tool} from "./tool";
import {Task} from "./task";

@Injectable({
  providedIn: 'root'
})
export class ToolService {

  private dataRows = (data as any).default;
  tools: Tool[] = [];

  constructor() {
    for (let dataRow of this.dataRows) {
      this.tools.push(<Tool>{...dataRow});
    }
  }

  getTool(id: number): Observable<Tool> {
    const tool = this.tools.find(h => h.id === id)!;
    return of(tool);
  }

  getTools(ids: number[]): Observable<Tool[]> {
    const tools = this.tools.filter(h => ids.indexOf(h.id) >= 0)!;
    return of(tools);
  }

  getTaskTools(tasks: Task[]): Observable<Tool[]> {
    let tools: Tool[] = []
    tasks.forEach(task => task.tools.forEach(j => {
      let tool = <Tool>{...j}
      tool.matching_task = task;
      tool.matching_step = task.step;
      tools.push(tool)
    }))
    return of(tools);
  }

  getToolBySlug(slug: string): Tool {
    return this.tools.find(h => isNaN(Number(slug)) ? h.slug === slug : h.id === Number(slug))!;
  }
}
