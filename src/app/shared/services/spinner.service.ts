import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

import { ProductsService } from '../../products/services/products.service';

@Injectable({
    providedIn: 'root',
})
export class SpinnerService {
    isDisplayed = false;
    spinnerSubject: Subject<boolean> = new Subject();

    private showRequestsCount = 0;

    constructor(productService: ProductsService) {
        productService.loading$.subscribe(isLoading => {
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
