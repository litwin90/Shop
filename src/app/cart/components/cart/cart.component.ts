import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { CartService } from '../../../shared/services/cart/cart.service';
import { ICartProduct } from '../../models/cart-product';
import { ICartInfo } from '../../models/cart-info';
import { OrderByPipe } from '../../../shared/pipes/order-by/order-by.pipe';
import { ICartSortByField, ICartSortByFieldId } from '../../models/cart-sort-by-field';
import { MatSelectChange } from '@angular/material/select';

const HOVER_BACKGROUND_COLOR = '#d3d3d31f';

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('title', { static: false }) titleElementRef: ElementRef<HTMLElement>;

    products: ICartProduct[] = [];
    cartInfo: ICartInfo;
    sortByFields: ICartSortByField[] = [
        { id: 'cost', name: 'Cost' },
        { id: 'name', name: 'Name' },
        { id: 'quantity', name: 'Quantity' },
    ];
    activeSortByFieldId: ICartSortByFieldId = 'name';
    isDescOrder = true;
    HOVER_BACKGROUND_COLOR = HOVER_BACKGROUND_COLOR;

    private products$: Subscription;
    private cartInfo$: Subscription;

    constructor(private cartService: CartService, private renderer: Renderer2, private orderBy: OrderByPipe) {}

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

    onIncrease(product: ICartProduct) {
        this.cartService.increaseQuantity(product);
    }

    onDecrease(product: ICartProduct) {
        this.cartService.decreaseQuantity(product);
    }

    onSelectOrderBy(sortByField: MatSelectChange) {
        this.activeSortByFieldId = this.sortByFields.find(field => field.id === sortByField.value)?.id;
    }

    onToggleOrder() {
        this.isDescOrder = !this.isDescOrder;
    }

    isCartFull(): boolean {
        return !!this.products.length;
    }

    trackBy(_, product?: ICartProduct) {
        return product ? `${product.id}${product.quantity}` : undefined;
    }

    isSomeItemSelected(): boolean {
        return this.products.some(product => product.isSelected);
    }

    removeSelectedItems() {
        const productsToRemove = this.products.filter(product => product.isSelected);

        this.cartService.removeProducts(productsToRemove);
    }

    getSortedProducts() {
        return this.orderBy.transform(this.products, this.activeSortByFieldId, this.isDescOrder);
    }
}
