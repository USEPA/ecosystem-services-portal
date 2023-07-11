import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {Path} from "../path";
import {PathService} from "../path.service";
import {MdePopoverTrigger} from "@material-extended/mde";
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-paths',
  templateUrl: './paths.component.html',
  styleUrls: ['./paths.component.scss']
})
export class PathsComponent implements OnInit {
  paths: Path[] = []
  @ViewChildren(MdePopoverTrigger) trigger: QueryList<MdePopoverTrigger>;
  assetPath = environment.assetPath;

  constructor(private pathService: PathService) {
  }

  ngOnInit() {
    sessionStorage.setItem('selectedStepIds', '')
    sessionStorage.setItem('selectedTaskIds', '')
    this.getPaths();
  }

  getPaths(): void {
    this.pathService.getPaths()
      .subscribe(paths => this.paths = paths.slice(0, 3));
  }

  openAppPopover(id: number) {
    this.trigger.toArray()[id - 1].togglePopover();
  }

  onOpen(args: any): void {
    args.preventFocus = true;
  }
}
