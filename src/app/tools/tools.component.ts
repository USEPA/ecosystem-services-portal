import {Component, Input, Output, OnChanges, EventEmitter} from '@angular/core';
import {Tool} from '../tool'
import {ActivatedRoute, Router} from "@angular/router";
import {ToolService} from "../tool.service";

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnChanges {
  @Input() matchingTools: Tool[] = []
  @Output() selectToolEvent = new EventEmitter<Tool>();

  constructor(private router: Router,
              private toolService: ToolService
  ) {
  }

  ngOnChanges() {
  }

}
