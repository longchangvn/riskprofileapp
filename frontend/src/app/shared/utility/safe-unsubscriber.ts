import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

export class SafeUnsubscriber implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor() {
      const func = this.ngOnDestroy;
      this.ngOnDestroy = () => {
          func();
          this.unsubscribeAll();
      };
  }

  protected safeSubscription(sub: Subscription): Subscription {
      this.subscriptions.push(sub);
      return sub;
  }

  protected safeSubscriptions(subs: Subscription[]): Subscription[] {
    this.subscriptions.push(...subs);
    return subs;
  }

  public unsubscribeAll() {
      this.subscriptions.forEach(element => !element.closed && element.unsubscribe() );
  }

  ngOnDestroy() {
  }
}
