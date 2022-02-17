import {Component, OnInit} from '@angular/core';
import {Path} from "../path";
import {PathService} from "../path.service";

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.css']
})
export class PathsComponent implements OnInit {
  paths: Path[] = []

  constructor(private pathService: PathService) {
  }

  ngOnInit() {
    sessionStorage.setItem('selectedStepIds', '')
    this.getPaths();
  }

  getPaths(): void {
    this.pathService.getPaths()
      .subscribe(paths => this.paths = paths.slice(0, 3));
  }


}
