import {Component, Input, OnChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Tool} from "./tool";

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: []
})
export class ProgressBarComponent implements OnChanges {
  @Input() matchingTools: Tool[] = []
  slug: String

  step1_class = "usa-step-indicator__segment--current"
  step2_class = "usa-step-indicator__segment"
  step3_class = "usa-step-indicator__segment"
  step4_class = "usa-step-indicator__segment"

  // unfilledColor = '#e3e4e5';
  // fillColor = '#616161';
  //
  // step1_color = this.unfilledColor;
  // step2_color = this.unfilledColor;
  // step3_color = this.unfilledColor;
  // step4_color = this.unfilledColor;
  //
  // inactiveTextColor = 'rgba(0, 0, 0, 0.26)';
  // previousTextColor = '#000000';
  // fillTextColor = 'currentColor';
  // step1_text_color = this.inactiveTextColor;
  // step2_text_color = this.inactiveTextColor;
  // step3_text_color = this.inactiveTextColor;
  // step4_text_color = this.inactiveTextColor;
  //
  // step1_weight = 'normal';
  // step2_weight = 'normal';
  // step3_weight = 'normal';
  // step4_weight = 'normal';
  //
  // step1_href = false;
  // step2_href = false;

  constructor(private route: ActivatedRoute) {
    this.slug = String(this.route.snapshot.paramMap.get('slug'));
    if (this.route.snapshot.url.find(h => h.path === 'tasks')) {
      this.step1_class = "usa-step-indicator__segment--complete"
      this.step2_class = "usa-step-indicator__segment--complete"
      this.step3_class = "usa-step-indicator__segment--current"
    } else if (this.route.snapshot.url.find(h => h.path === 'steps')) {
      this.step1_class = "usa-step-indicator__segment--complete"
      this.step2_class = "usa-step-indicator__segment--current"
      this.step3_class = "usa-step-indicator__segment"
    } else {
      this.step1_class = "usa-step-indicator__segment--current"
    }




    // if (this.slug == 'ecological-risk-assessments') {
    //   this.unfilledColor = '#aacdea'
    //   this.fillColor = '#1a4480'
    // } else if (this.slug == 'contaminated-site-cleanup') {
    //   this.unfilledColor = '#fee685'
    //   this.fillColor = '#e5a000'
    // } else if (this.slug == 'other-decision-making-contexts') {
    //   this.unfilledColor = '#dbebde'
    //   this.fillColor = '#4d8055'
    // }
    //
    // this.step1_color = this.unfilledColor;
    // this.step2_color = this.unfilledColor;
    // this.step3_color = this.unfilledColor;
    // this.step4_color = this.unfilledColor;
    //
    // if (this.route.snapshot.url.find(h => h.path === 'tasks')) {
    //   this.step3_color = this.fillColor;
    //   this.step1_text_color = this.previousTextColor
    //   this.step2_text_color = this.previousTextColor
    //   this.step3_text_color = this.fillTextColor
    // } else if (this.route.snapshot.url.find(h => h.path === 'steps')) {
    //   this.step2_color = this.fillColor;
    //   this.step1_text_color = this.previousTextColor
    //   this.step2_text_color = this.fillTextColor
    // } else {
    //   this.step1_color = this.fillColor;
    //   this.step1_text_color = this.fillTextColor
    // }
    //
    // let thisUrlSegment = this.route.snapshot.url[this.route.snapshot.url.length - 1].toString()
    // if (thisUrlSegment === 'tasks') {
    //   this.step3_weight = 'bold';
    //   this.step2_href = true;
    //   this.step1_href = true;
    // } else if (thisUrlSegment === 'steps') {
    //   this.step2_weight = 'bold';
    //   this.step1_href = true;
    // } else {
    //   this.step1_weight = 'bold';
    // }
  }

  ngOnChanges(): void {
    if (this.matchingTools.length > 0) {
      this.step3_class = "usa-step-indicator__segment--complete"
      this.step4_class = "usa-step-indicator__segment--current"
    } else {
      this.step3_class = "usa-step-indicator__segment--current"
      this.step4_class = "usa-step-indicator__segment"
    }
    // if (this.matchingTools.length > 0) {
    //   this.step4_color = this.fillColor;
    //   this.step3_color = this.unfilledColor;
    //   this.step3_text_color = this.previousTextColor;
    //   this.step4_text_color = this.fillTextColor;
    //   this.step3_weight = 'normal';
    //   this.step4_weight = 'bold';
    // } else {
    //   this.step4_color = this.unfilledColor;
    //   this.step3_color = this.fillColor;
    //   this.step3_text_color = this.fillTextColor;
    //   this.step4_text_color = this.inactiveTextColor;
    //   this.step3_weight = 'bold';
    //   this.step4_weight = 'normal';
    // }
  }

}
