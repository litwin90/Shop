import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';

import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { Subscription } from 'rxjs';

import { CartService } from '../../../shared/services/cart/cart.service';
import { ICartProduct } from '../../models/cart-product';
import { ICartInfo } from '../../models/cart-info';
import { OrderByPipe } from '../../../shared/pipes/order-by/order-by.pipe';
import { ICartSortByField, ICartSortByFieldId } from '../../models/cart-sort-by-field';

const HOVER_BACKGROUND_COLOR = '#d3d3d31f';

@Component({
    templateUrl: './cart-table.component.html',
    styleUrls: ['./cart-table.component.scss'],
})
export class CartTableComponent implements OnInit, OnDestroy {
    products: ICartProduct[] = [];
    cartInfo: ICartInfo;
    sortByFields: ICartSortByField[] = [
        { id: 'cost', name: 'Cost' },
        { id: 'name', name: 'Name' },
        { id: 'quantity', name: 'Quantity' },
    ];
    isDescOrder = true;
    isCheckAllSelected = false;
    HOVER_BACKGROUND_COLOR = HOVER_BACKGROUND_COLOR;

    private products$: Subscription;
    private cartInfo$: Subscription;
    private activeSortByFieldId: ICartSortByFieldId = 'name';

    constructor(private cartService: CartService, private renderer: Renderer2, private orderBy: OrderByPipe) {}

    ngOnInit(): void {
        // Init:
        this.products = this.cartService.getProducts();
        this.cartInfo = this.cartService.getCartInfo();

        // Subscription to updates:
        this.products$ = this.cartService.productsSubject.subscribe(products => {
            this.products = products;
        });
        this.cartInfo$ = this.cartService.cartInfoSubject.subscribe(cartInfo => {
            this.cartInfo = cartInfo;
        });
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

    onToggleCheckAll(event: MatCheckboxChange) {
        if (event.checked) {
            this.cartService.checkAllItems();
        } else {
            this.cartService.unCheckAllItems();
        }
    }

    get sortBy(): ICartSortByFieldId {
        return this.activeSortByFieldId;
    }

    set sortBy(sortBy: ICartSortByFieldId) {
        this.activeSortByFieldId = sortBy;
    }

    isCartFull(): boolean {
        return !!this.products.length;
    }

    trackBy(_, product?: ICartProduct) {
        return product ? `${product.id}${product.quantity}${product.isSelected}` : undefined;
    }

    isSomeItemSelected(): boolean {
        return this.products.some(product => product.isSelected);
    }

    removeSelectedItems() {
        const productsToRemove = this.products.filter(product => product.isSelected);

        this.cartService.removeProducts(productsToRemove);
        this.isCheckAllSelected = false;
    }

    getSortedProducts() {
        return this.orderBy.transform(this.products, this.activeSortByFieldId, this.isDescOrder);
    }
}
