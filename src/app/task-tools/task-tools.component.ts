import {Component, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import {Tool} from '../tool'
import {Path} from "../path";
import {Router} from "@angular/router";
import {ToolService} from "../tool.service";

@Component({
  selector: 'app-task-tools',
  templateUrl: './task-tools.component.html',
  styleUrls: ['./task-tools.component.scss']
})
export class TaskToolsComponent implements OnChanges {
  @Input() matchingTools: Tool[] = []
  @Input() path: Path;
  @Output() selectToolEvent = new EventEmitter<Tool>();

  constructor(private router: Router,
              private toolService: ToolService
  ) {
  }

  ngOnChanges() {
  }

}
