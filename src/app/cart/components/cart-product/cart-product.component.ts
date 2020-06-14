import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { pluck } from 'rxjs/operators';

import { CartService, AppPaths, WithSubscriptions } from '../../../shared';
import { ICartProduct } from '../../models';
import { IProduct } from '../../../products';
import {
    FormControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    templateUrl: './cart-product.component.html',
    styleUrls: ['./cart-product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductComponent extends WithSubscriptions implements OnInit {
    quantityControl: FormControl;
    options: FormGroup;

    productId: string;
    productName: string;
    description: string;
    price: number;
    totalCost: number;
    quantity: number;

    constructor(
        private router: Router,
        private activeRoute: ActivatedRoute,
        private cartService: CartService,
        private formBuilder: FormBuilder,
    ) {
        super();
    }

    ngOnInit(): void {
        const routerData$ = this.activeRoute.data
            .pipe(pluck('productData'))
            .subscribe({
                next: (productData: {
                    cartProduct: ICartProduct;
                    product: IProduct;
                }) => {
                    this.setComponentData(productData);
                    this.configureForm();
                },
                error: (err: any) => {
                    console.log(err);
                },
            });
        const quantityField$ = this.options
            .get('quantity')
            .valueChanges.subscribe(quantity => {
                this.updateProductData(quantity);
            });
        this.subscriptions.push(routerData$, quantityField$);
    }

    onSave() {
        this.cartService.updateProduct({
            id: this.productId,
            quantity: this.quantity,
            cost: this.totalCost,
        });
        this.router.navigate([AppPaths.Cart]);
    }

    onRemoveFromCart() {
        this.cartService.removeProduct(this.productId);
        this.router.navigate([AppPaths.Cart]);
    }

    private setComponentData({
        product,
        cartProduct,
    }: {
        cartProduct: ICartProduct;
        product: IProduct;
    }) {
        this.productId = product.id;
        this.price = product.price;
        this.totalCost = cartProduct.cost;
        this.quantity = cartProduct.quantity;
        this.productName = cartProduct.name;
        this.description = product.description;
    }

    private configureForm() {
        this.quantityControl = new FormControl(
            this.quantity,
            Validators.min(1),
        );
        this.options = this.formBuilder.group({
            quantity: this.quantityControl,
        });
    }

    private updateProductData(quantity: number) {
        this.quantity = quantity;
        this.totalCost = this.price * quantity;
    }
}
