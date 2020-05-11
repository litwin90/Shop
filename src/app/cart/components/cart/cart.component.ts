import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

import { CartService } from '../../../shared/services/cart/cart.service';
import { ICartProduct } from '../../models/cart-product';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('title', { static: false }) titleElementRef: ElementRef<HTMLElement>;

    private products$: Subscription;

    products: ICartProduct[] = [];

    constructor(private cartService: CartService, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.products$ = this.cartService.productsSubject.subscribe(products => {
            this.products = products;
        });
    }

    ngAfterViewInit(): void {
        const title = this.renderer.createText('This is product cart');
        this.renderer.appendChild(this.titleElementRef.nativeElement, title);
    }

    ngOnDestroy(): void {
        this.products$.unsubscribe();
    }

    get isCartFull(): boolean {
        return !!this.products.length;
    }

    get title(): string {
        return 'Products in cart:';
    }

    get totalCost() {
        return this.cartService.getTotalCost();
    }

    trackBy(_, product?: ICartProduct) {
        return product ? `${product.id}${product.quantity}` : undefined;
    }

    onIncrease(product: ICartProduct) {
        this.cartService.increaseQuantity(product);
    }

    onDecrease(product: ICartProduct) {
        this.cartService.decreaseQuantity(product);
    }

    isSomeItemSelected(): boolean {
        return this.products.some(product => product.isSelected);
    }

    removeSelectedItems() {
        const productsToRemove = this.products.filter(product => product.isSelected);

        this.cartService.removeProducts(productsToRemove);
    }
}
