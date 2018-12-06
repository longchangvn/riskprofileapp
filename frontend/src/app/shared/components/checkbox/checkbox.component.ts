import { Component, Input } from '@angular/core';
import { BaseControlValueAccessor } from '@app/shared/base-classes/base-control-value-accessor';
import { CUSTOM_VALUE_ACCESSOR } from 'app/shared/providers';
import { HelperService } from '../../../shared/service/helper-services';

@Component({
  selector: 'checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [CUSTOM_VALUE_ACCESSOR(CheckboxComponent)]
})
export class CheckboxComponent extends BaseControlValueAccessor {
  private checked = false;
  constructor(private helperService: HelperService) { super(); this.autoId = helperService.newGuid(); }
  @Input() displayLabel: string;
  autoId: any;
  writeValue(value: any): void {
    this.checked = !!value;
    this._onChange(this.checked);
  }
  onChanged(value: boolean) {
    this.checked = value;
    this._onChange(this.checked);
  }
}
