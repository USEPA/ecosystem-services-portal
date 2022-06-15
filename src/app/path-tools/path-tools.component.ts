import {Component, Input, OnInit} from '@angular/core';
import {Tool} from '../tool'
import {Path} from "../path";
import {ToolService} from "../tool.service";

@Component({
  selector: 'app-path-tools',
  templateUrl: './path-tools.component.html',
  styleUrls: ['./path-tools.component.scss']
})
export class PathToolsComponent implements OnInit {
  @Input() path: Path;
  matchingTools: Tool[] = [];

  constructor(private toolService: ToolService
  ) {
  }

  ngOnInit(): void {
    this.matchingTools = this.toolService.getToolsByPath(this.path)
  }

}
