import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Tool} from "../tool";
import {Path} from "../path";
import {ToolService} from "../tool.service";
import {PathService} from "../path.service";

@Component({
  selector: 'app-tool-detail',
  templateUrl: './tool-detail.component.html',
  styleUrls: ['./tool-detail.component.css']
})
export class ToolDetailComponent implements OnInit {
  tool: Tool;
  pathSteps: Path[] = []
  objectKeys = Object.keys;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private toolService: ToolService,
              private pathService: PathService,) {
  }

  ngOnInit() {
    const slug = String(this.route.snapshot.paramMap.get('slug'));
    this.tool = this.toolService.getToolBySlug(slug)
    if (this.tool) {
      sessionStorage.setItem('selectedToolId', this.tool.id.toString())
    } else {
      this.router.navigate(['/', {}]);
    }
    this.getPathSteps();
  }

  getPathSteps(): void {
    this.pathService.getPaths().subscribe(paths => this.pathSteps = paths.slice(0, 3));
    for (let i in this.tool.related_steps) {
      let stepArray: string[] = []
      for (let l of this.tool.related_steps[i]) {
        stepArray.push(l)
      }
      this.pathSteps[parseInt(i)-1]!.related_steps = stepArray
    }
  }

  get toolDetails(): String {
    let detail = "<div class=\"grid\">";
    for (let col1 of this.objectKeys(this.tool.detail)) {
      detail += "<div class=\"grid-row\">\n" +
        "    <div class=\"grid-col-3\"><b>" + col1 + "</b></div>"
      this.tool.detail[col1].forEach((value, index)  => {
        if (col1 == "Level of time needed:") {
          detail += "<div class=\"grid-col-4\">" + value[0] + "</div>\n" +
                    "<div class=\"grid-col-5\">" +  value[1] + "</div>\n"
        } else {
          detail += "<div class=\"grid-col-9\">" + value + "</div>\n"
        }
        detail += "</div>"
        if (index < this.tool.detail[col1].length - 1) {
          detail += "<div class=\"grid-row\"><div class=\"grid-col-3\"></div>"
        }
      })
    }
    detail += "</div>"
    return detail
  }

}
