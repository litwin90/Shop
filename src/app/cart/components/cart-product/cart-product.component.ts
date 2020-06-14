import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { pluck } from 'rxjs/operators';

import {
    CartService,
    AppPaths,
    WithSubscriptions,
    FlexDirection,
} from '../../../shared';
import { ICartProduct } from '../../models';
import {
    FormControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Observable, of } from 'rxjs';
import { ConfirmationService } from '../../../shared/services/confirmation.service';

@Component({
    templateUrl: './cart-product.component.html',
    styleUrls: ['./cart-product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductComponent extends WithSubscriptions implements OnInit {
    quantityControl: FormControl;
    options: FormGroup;

    product: ICartProduct;
    initialProductSnapshot: string;

    FlexDirection = FlexDirection;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private cartService: CartService,
        private formBuilder: FormBuilder,
        private confirmation: ConfirmationService,
    ) {
        super();
    }

    ngOnInit(): void {
        const routerData$ = this.activeRoute.data
            .pipe(pluck('product'))
            .subscribe((product: ICartProduct) => {
                this.product = { ...product };
                this.initialProductSnapshot = JSON.stringify(product);
                this.configureForm();
            });
        const quantityField$ = this.options
            .get('quantity')
            .valueChanges.subscribe(quantity => {
                this.updateProductData(quantity);
            });
        this.subscriptions.push(routerData$, quantityField$);
    }

    onSave() {
        this.cartService.updateProduct(this.product);
        this.initialProductSnapshot = JSON.stringify(this.product);
        this.router.navigate([AppPaths.Cart]);
    }

    onRemoveFromCart() {
        this.cartService.removeProduct(this.product.id);
        this.router.navigate([AppPaths.Cart]);
    }

    private configureForm() {
        this.quantityControl = new FormControl(
            this.product.quantity,
            Validators.min(1),
        );
        this.options = this.formBuilder.group({
            quantity: this.quantityControl,
        });
    }

    private updateProductData(quantity: number) {
        this.product.quantity = quantity;
        this.product.cost = this.product.price * quantity;
    }

    isProductChanged(): boolean {
        return this.initialProductSnapshot !== JSON.stringify(this.product);
    }

    canDeactivate(): Observable<boolean> {
        if (this.isProductChanged() && this.product) {
            return this.confirmation.askConfirmation({
                message: 'Are you sure to leave edit form? Data is not saved',
            });
        } else {
            return of(true);
        }
    }
}
