import {
    Component,
    OnInit,
    ChangeDetectionStrategy,
    OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { pluck } from 'rxjs/operators';

import { CartService, AppPaths } from '../../../shared';
import { ICartProduct } from '../../models';
import { IProduct } from '../../../products';
import {
    FormControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    templateUrl: './cart-product.component.html',
    styleUrls: ['./cart-product.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartProductComponent implements OnInit, OnDestroy {
    private subscriptions: Subscription[] = [];

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
        private route: ActivatedRoute,
        private cartService: CartService,
        private formBuilder: FormBuilder,
    ) {}

    ngOnInit(): void {
        const routeSubscription = this.route.data
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
        const quantityChangesSubscription = this.options
            .get('quantity')
            .valueChanges.subscribe(quantity => {
                this.updateProductData(quantity);
            });
        this.subscriptions.push(routeSubscription, quantityChangesSubscription);
    }

    ngOnDestroy(): void {
        this.subscriptions.map(subscription => subscription.unsubscribe());
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
