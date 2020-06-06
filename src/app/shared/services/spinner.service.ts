import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SpinnerService {
    isDisplayed = false;
    spinnerSubject: Subject<boolean> = new Subject();

    constructor() {}

    showSpinner() {
        this.isDisplayed = true;
        this.spinnerSubject.next(true);
    }

    hideSpinner() {
        this.isDisplayed = false;
        this.spinnerSubject.next(false);
    }
}
