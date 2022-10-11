import {Component, Input, OnChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Tool} from "./tool";

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.svg',
  styleUrls: []
})
export class ProgressBarComponent implements OnChanges {
  @Input() matchingTools: Tool[] = []
  slug: String

  unfilledColor = '#ffffff';
  fillColor = '#e3e4e5';
  textColor = '#000000';

  step1 = this.unfilledColor;
  step2 = this.unfilledColor;
  step3 = this.unfilledColor;
  step4 = this.unfilledColor;

  step1_weight = 'normal';
  step2_weight = 'normal';
  step3_weight = 'normal';
  step4_weight = 'normal';

  step1_href = false;
  step2_href = false;

  constructor(private route: ActivatedRoute) {
    this.slug = String(this.route.snapshot.paramMap.get('slug'));
    if (this.slug == 'ecological-risk-assessments') {
      this.fillColor = '#85a4ff'
      this.textColor = '#ffffff'
    } else if (this.slug == 'contaminated-site-cleanup') {
      this.fillColor = '#ffe5c6'
      this.textColor = '#ffffff'
    } else if (this.slug == 'other-decision-making-contexts') {
      this.fillColor = '#96ffa3'
      this.textColor = '#000000'
    }

    this.step1 = this.fillColor;
    if (this.route.snapshot.url.find(h => h.path === 'steps')) {
      this.step2 = this.fillColor;
    }
    if (this.route.snapshot.url.find(h => h.path === 'tasks')) {
      this.step3 = this.fillColor;
    }
    let thisUrlSegment = this.route.snapshot.url[this.route.snapshot.url.length-1].toString()
    if (thisUrlSegment === 'tasks') {
      this.step3_weight = 'bold';
      this.step2_href = true;
      this.step1_href = true;
    } else if (thisUrlSegment === 'steps') {
      this.step2_weight = 'bold';
      this.step1_href = true;
    } else {
      this.step1_weight = 'bold';
    }
  }

  ngOnChanges(): void {
    if (this.matchingTools.length > 0 ) {
      this.step4 = this.fillColor;
      this.step3_weight = 'normal';
      this.step4_weight = 'bold';
    } else {
      this.step4 = this.unfilledColor;
      this.step3_weight = 'bold';
      this.step4_weight = 'normal';
    }
  }

}
