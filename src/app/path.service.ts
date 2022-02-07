import {Injectable} from '@angular/core';
import {Path} from "./path";
import * as data from '../assets/paths.json';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  paths: Path[] = (data as any).default;

  constructor() {
  }

  getPaths(): Observable<Path[]> {
    return of(this.paths);
  }

  getPath(id: number): Observable<Path> {
    const path = this.paths.find(h => h.id === id)!;
    return of(path);
  }

  getPathBySlug(slug: string): Path {
    return this.paths.find(h => h.slug === slug)!;
  }
}

