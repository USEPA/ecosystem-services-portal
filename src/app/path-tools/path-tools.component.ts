import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tool} from '../tool'
import {Path} from "../path";
import {Router} from "@angular/router";
import {ToolService} from "../tool.service";

@Component({
  selector: 'app-path-tools',
  templateUrl: './path-tools.component.html',
  styleUrls: ['./path-tools.component.scss']
})
export class PathToolsComponent implements OnInit {
  @Input() matchingTools: Tool[] = []
  @Input() path: Path | undefined;
  @Output() selectToolEvent = new EventEmitter<Tool>();

  constructor(private router: Router,
              private toolService: ToolService
  ) {
  }

  ngOnChanges() {
  }

  ngOnInit(): void {
  }

}
