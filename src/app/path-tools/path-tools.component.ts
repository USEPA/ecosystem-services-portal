import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';
import {Tool} from '../tool'
import {Path} from "../path";
import {ToolService} from "../tool.service";
import {ActivatedRoute} from "@angular/router";
import {PathService} from "../path.service";

@Component({
  selector: 'app-path-tools',
  templateUrl: './path-tools.component.html',
})
export class PathToolsComponent {
  path: Path;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private pathService: PathService,) {
    const slug = String(this.route.snapshot.paramMap.get('slug'));
    this.pathService.getPathBySlug(slug).subscribe(h => this.path = h)
  }

  openDialog() {
    this.dialog.open(PathToolsComponentDialog,
      {
        width: '1048px',
        data: {path: this.path}
      });
  }
}

@Component({
  selector: 'path-tools-component-dialog',
  templateUrl: './path-tools-dialog.component.html',
  styleUrls: ['./path-tools.component.scss']
})
export class PathToolsComponentDialog implements OnInit {
  path: Path
  matchingTools: Tool[] = [];
  offset: number = 0;

  constructor(private toolService: ToolService,
              public dialog: MatDialog,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log(data.path)
    this.path = data.path
    this.toolService.getPathTools(this.path).subscribe(h => this.matchingTools = h)
    this.offset = this.matchingTools[0].matching_step.id - 1
  }

  ngOnInit(): void {
  }
}
