import {Component, Input, OnInit} from '@angular/core';
import {Tool} from '../tool'
import {ActivatedRoute, Router} from "@angular/router";
import {ToolService} from "../tool.service";

@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.scss']
})
export class ToolsComponent implements OnInit {
  @Input() matchingTools: Tool[] = []
  selectedTool: Tool

  constructor(private router: Router,
              private route: ActivatedRoute,
              private toolService: ToolService
  ) {
  }

  ngOnInit() {
  }

  selectTool(task_id: number, slug: string) {
    this.selectedTool = this.toolService.getToolBySlug(slug);

    this.router.navigate(['/tools',task_id,this.selectedTool.slug]);
  }
}
