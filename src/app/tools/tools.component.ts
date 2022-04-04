import {Component, Input, OnInit, SimpleChanges} from '@angular/core';
import {Tool} from '../tool'

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {
  displayedColumns: string[] = ['matching_step_name', 'name'];
  @Input() matchingTools: Tool[] = []

  constructor() { }

  ngOnInit() {
  }
}
