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
import {Router} from "@angular/router";
import {ToolService} from "../tool.service";
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
              private router: Router,
              private toolService: ToolService
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
  url: string[];

  constructor(public dialog: MatDialog,
              private router: Router,
              @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.tool = data.dialogTool;
    this.path = data.path;
    this.url = ['/tools', this.tool.matching_task.id.toString(), this.tool.slug];
  }

  selectTool(tool: Tool) {
    const url = this.router.serializeUrl(this.router.createUrlTree(['/tools', tool.matching_task.id, tool.slug], {}));
    window.open(url, '_blank');
  }

  ngOnInit(): void {
  }
}
