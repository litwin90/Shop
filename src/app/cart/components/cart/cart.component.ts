import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

import { CartService } from '../../../shared/services/cart/cart.service';
import { ICartProduct } from '../../models/cart-product';
import { Subscription } from 'rxjs';
import { ICartInfo } from '../../models/cart-info';

const HOVER_BACKGROUND_COLOR = '#d3d3d31f';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('title', { static: false }) titleElementRef: ElementRef<HTMLElement>;

    private products$: Subscription;
    private cartInfo$: Subscription;

    products: ICartProduct[] = [];
    cartInfo: ICartInfo;

    HOVER_BACKGROUND_COLOR = HOVER_BACKGROUND_COLOR;

    constructor(public cartService: CartService, private renderer: Renderer2) {}

    ngOnInit(): void {
        this.products$ = this.cartService.productsSubject.subscribe(products => {
            this.products = products;
        });
        this.cartInfo$ = this.cartService.cartInfoSubject.subscribe(cartInfo => {
            this.cartInfo = cartInfo;
        });
    }

    ngAfterViewInit(): void {
        const title = this.renderer.createText('This is product cart');
        this.renderer.appendChild(this.titleElementRef.nativeElement, title);
    }

    ngOnDestroy(): void {
        this.products$.unsubscribe();
        this.cartInfo$.unsubscribe();
    }

    isCartFull(): boolean {
        return !!this.products.length;
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
