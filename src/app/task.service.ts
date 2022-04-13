import {Injectable} from '@angular/core';
import * as data from '../assets/tasks.json';
import {Observable, of} from 'rxjs';
import {Task} from "./task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  tasks: Task[] = (data as any).default;

  constructor() {
  }

  getTask(id: number): Observable<Task> {
    const task = this.tasks.find(h => h.id === id)!;
    return of(task);
  }

  getTasks(): Observable<Task[]> {
    return of(this.tasks);
  }

  getTasksByStepIds(step_ids: number[]): Task[] {
    return this.tasks.filter(h => step_ids.indexOf(h.step_id) >= 0)!;
  }

  getTasksByToolId(tool_id: number): Task[] {
    return this.tasks.filter(h => h.tool_id === tool_id)!;
  }
}

