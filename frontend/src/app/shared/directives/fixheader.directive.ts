import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[fixheader]'
})
export class FixheaderDirective {

  location: number;
  constructor(private el: ElementRef) {
    this.location = el.nativeElement.offsetTop;
  }

  @HostListener("window:scroll", ["$event"])
  onListenerTriggered(event: UIEvent): void {

    if (window.pageYOffset > this.location) {
      this.el.nativeElement.classList.add("sticky");
    } else {
      this.el.nativeElement.classList.remove("sticky");
    }
  }
}
