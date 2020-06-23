import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RouterFacade } from '../../../router-state';
import { FlexDirection, WithSubscriptions } from '../../../shared';
import { ConfirmationService } from '../../../shared/services/confirmation.service';
import { ICartProduct } from '../../models';
import { CartService } from '../../services';

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
        private routerFacade: RouterFacade,
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
        this.cartService.updateProduct(this.product).subscribe(() => {
            this.initialProductSnapshot = JSON.stringify(this.product);
            this.routerFacade.goToCart();
        });
    }

    onRemoveFromCart() {
        this.cartService
            .removeProduct(this.product.id)
            .subscribe(() => this.routerFacade.goToCart());
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
            return this.confirmation.ask({
                message: 'Are you sure to leave edit form? Data is not saved',
            });
        } else {
            return of(true);
        }
    }
}
