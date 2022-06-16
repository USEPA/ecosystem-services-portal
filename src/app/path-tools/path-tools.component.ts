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
    console.log(this.route.snapshot.paramMap)
    this.path = this.pathService.getPathBySlug(slug)
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
    this.path = data.path
    this.matchingTools = this.toolService.getToolsByPath(this.path)
    this.offset = this.matchingTools[0].matching_step.id - 1
  }

  ngOnInit(): void {
  }
}
