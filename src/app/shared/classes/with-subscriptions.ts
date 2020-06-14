import { OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';

export abstract class WithSubscriptions implements OnDestroy {
    subscriptions: Subscription[] = [];

    ngOnDestroy(): void {
        this.subscriptions.map(s => s.unsubscribe());
    }
}
