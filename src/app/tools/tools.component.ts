import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Tool} from '../tool'

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnChanges {
  displayedColumns: string[] = ['matching_step_name', 'name'];
  @Input() matchingTools: Tool[] = []

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
  }
}
