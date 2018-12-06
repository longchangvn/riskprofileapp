import { DOCUMENT } from '@angular/common';
import { Directive, Inject, ElementRef, Input, OnDestroy } from '@angular/core';
import { OnInit } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { merge } from 'rxjs/observable/merge';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { map } from 'rxjs/operators/map';
import { Observable } from 'rxjs/Observable';
@Directive({
  selector: '[appEventStopPropagation]'
})
export class EventStopPropagationDirective implements OnInit, OnDestroy {
  @Input() events: string[] = [];
  @Input() selector = '';
  private unsubscribe = new Subject();
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef
  ) { }

  ngOnInit(): void {
    if (!this.events) return;
    this.stop(this.events, this.selector);
  }

  stop(eventNames: string[], querySelector: string) {
    let elements = [this.el.nativeElement];
    const selectedElements = !!querySelector && this.document.querySelectorAll(querySelector);
    if ( selectedElements.length > 0 ) {
      elements = Array.prototype.slice.call(selectedElements);
    }
    const validEvents = eventNames.filter( event => !!event);
    const events$: Observable<any>[] = [];
    elements.forEach(
      el => validEvents.map(
        event => events$.push( fromEvent(el, event, true) )
      )
    );
    merge(...events$)
      .pipe(
        takeUntil(this.unsubscribe),
        map( e => e as Event)
      ).subscribe( e =>
        e.stopPropagation()
      );
  }

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
