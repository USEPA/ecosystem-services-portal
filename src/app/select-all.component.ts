import { Component, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-select-all',
  templateUrl: './select-all.component.html',
  styleUrls: ['./select-all.component.scss']
})
export class SelectAllComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
