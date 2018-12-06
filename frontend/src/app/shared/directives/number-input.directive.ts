import { HostListener, Input, ElementRef, Directive, OnChanges } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[numberInput]'
})
export class NumberInputDirective implements OnChanges {
  @Input() allowNegative = false;
  @Input() allowDecimal = false;
  private intRegex = new RegExp(/^([-0-9])([0-9])*$/g);
  private positiveIntRegex = new RegExp(/^[0-9]*$/g);
  private decimalRegex = new RegExp(/^-?[0-9]+(\.[0-9]*){0,1}$/g);
  private positiveDecimalRegex = new RegExp(/^[0-9]+(\.[0-9]*){0,1}$/g);
  private usedRegex: RegExp;
  // Allow key codes for special events. Reflect :
  // Backspace, tab, end, home
  private specialKeys: Array<string> = ['Backspace', 'Tab', 'End', 'Home'];
  constructor(private el: ElementRef) {
    this.setRegexByConditions();
  }

  ngOnChanges(changes: any): void {
    this.setRegexByConditions();
  }

  setRegexByConditions() {
    this.usedRegex = this.allowDecimal ? this.positiveDecimalRegex : this.positiveIntRegex;
    if (!this.allowNegative) return;
    this.usedRegex = this.usedRegex === this.positiveIntRegex ? this.intRegex : this.decimalRegex;
  }

  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey) return;
    if (event.keyCode < 46 || event.keyCode > 57) return;
    if (event.key.match(this.usedRegex)) return;
    event.preventDefault();
  }

  @HostListener('keypress', ['$event'])
  onKeyPress(event: KeyboardEvent) {
    if (this.specialKeys.indexOf(event.key) > -1) return;
    if (String(event.key).match(this.usedRegex)) return;
    event.preventDefault();
  }
}
