import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Dictionary } from 'extension';

@Component({
  selector: 'checkbox-buttons',
  templateUrl: './checkbox-buttons.component.html',
  styleUrls: ['./checkbox-buttons.component.scss']
})
export class CheckboxButtonsComponent {
  @Input() options: Dictionary = [];
  @Input() cls = 'btn btn-primary';
  @Input() activeCls = 'btn btn-primary';
  @Input() debounce = 500;
  @Output() selected = new EventEmitter<string[]>();

  constructor() {}
  triggerSearch() {
    const selections = this.options.filter(x => {
      return x.isSelected;
    });
    this.selected.emit(selections);
  }
}
