import {
  Component,
  Input,
  Output,
  OnChanges,
  EventEmitter,
  ViewEncapsulation,
  OnInit,
  Optional,
  Inject
} from '@angular/core';
import {Tool} from '../tool'
import {Path} from "../path";
import {ActivatedRoute, Router} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";


@Component({
  selector: 'app-task-tools',
  templateUrl: './task-tools.component.html',
  styleUrls: ['./task-tools.component.scss']
})
export class TaskToolsComponent implements OnChanges {
  @Input() matchingTools: Tool[] = []
  @Input() path: Path;
  @Output() selectToolEvent = new EventEmitter<Tool>();

  constructor(public dialog: MatDialog,
  ) {
  }

  ngOnChanges() {
  }

  openDialog(tool: Tool) {
    this.dialog.open(TaskToolsComponentDialog,
      {
        width: '1040px',
        height: '90%',
        data: {dialogTool: tool,
               path: this.path
        }
      });
  }
}

@Component({
  templateUrl: '../task-tools/task-tools-dialog.component.html',
  styleUrls: ['../task-tools/task-tools.component.scss']
})
export class TaskToolsComponentDialog implements OnInit {
  tool: Tool;
  path: Path;

  constructor(public dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tool = data.dialogTool;
    this.path = data.path;
  }

  selectTool(tool: Tool) {
    window.open(location.href.replace(location.hash,"") + '#/tools/' + tool.matching_task.id + '/' + tool.slug, '_blank');
  }

  ngOnInit(): void {
  }
}
