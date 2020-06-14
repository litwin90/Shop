import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SpinnerService {
    isDisplayed = false;
    spinnerSubject: Subject<boolean> = new Subject();

    private showRequestsCount = 0;

    constructor() {}

    show() {
        this.showRequestsCount++;
        this.isDisplayed = true;
        this.spinnerSubject.next(true);
    }

    hide() {
        this.showRequestsCount--;
        if (!this.showRequestsCount) {
            this.isDisplayed = false;
            this.spinnerSubject.next(false);
        }
    }
}
