import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { Subject } from 'rxjs';

import { IAppState } from '../../core/@ngrx';

@Injectable({
    providedIn: 'root',
})
export class SpinnerService {
    isDisplayed = false;
    spinnerSubject: Subject<boolean> = new Subject();

    private showRequestsCount = 0;

    constructor(private store: Store<IAppState>) {
        this.store.pipe(select('products')).subscribe(({ isLoading }) => {
            isLoading ? this.show() : this.hide();
        });
    }

    show() {
        this.showRequestsCount++;
        this.isDisplayed = true;
        this.spinnerSubject.next(true);
    }

    hide() {
        if (this.isDisplayed) {
            this.showRequestsCount--;
        }
        if (!this.showRequestsCount) {
            this.isDisplayed = false;
            this.spinnerSubject.next(false);
        }
    }
}
