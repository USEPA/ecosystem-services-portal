import {Injectable} from '@angular/core';
import {Path} from "./path";
import * as data from '../assets/data/paths.json';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PathService {

  private dataRows = (data as any).default;
  paths: Path[] = [];

  constructor() {
    for (let dataRow of this.dataRows) {
      this.paths.push(<Path>{...dataRow});
    }
  }

  getPaths(): Observable<Path[]> {
    return of(this.paths);
  }

  getPath(id: number): Observable<Path> {
    const path = this.paths.find(h => h.id === id)!;
    return of(path);
  }

  getPathBySlug(slug: string): Observable<Path> {
    return of(this.paths.find(h => h.slug === slug)!);
  }
}

