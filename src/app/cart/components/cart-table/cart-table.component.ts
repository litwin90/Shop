import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';

import {
    CartService,
    OrderByPipe,
    AppPaths,
    HOVER_BACKGROUND_COLOR,
    WithRouteData,
} from '../../../shared';
import {
    ICartProduct,
    ICartSortByField,
    ICartSortByFieldId,
    ICartData,
} from '../../models';
import { OrdersPaths } from '../../../orders/orders.constants';
import { pluck } from 'rxjs/operators';

@Component({
    templateUrl: './cart-table.component.html',
    styleUrls: ['./cart-table.component.scss'],
})
export class CartTableComponent extends WithRouteData implements OnInit {
    cartData: ICartData;
    sortByFields: ICartSortByField[] = [
        { id: 'cost', name: 'Cost' },
        { id: 'name', name: 'Name' },
        { id: 'quantity', name: 'Quantity' },
    ];
    isDescOrder = true;
    isCheckAllSelected = false;
    HOVER_BACKGROUND_COLOR = HOVER_BACKGROUND_COLOR;

    private activeSortByFieldId: ICartSortByFieldId = 'name';

    constructor(
        private cartService: CartService,
        private orderBy: OrderByPipe,
        private router: Router,
        private activeRoute: ActivatedRoute,
    ) {
        super(activeRoute);
    }

    ngOnInit(): void {
        const routerData$ = this.activeRoute.data
            .pipe(pluck('cartData'))
            .subscribe((cartData: ICartData | null) => {
                this.cartData = cartData;
            });
        const cartData$ = this.cartService.cartDataSubject.subscribe(
            cartData => (this.cartData = cartData),
        );
        this.subscriptions.push(routerData$);
    }

    onIncrease(product: ICartProduct) {
        this.cartService.increaseQuantity(product.id);
    }

    onDecrease(product: ICartProduct) {
        this.cartService.decreaseQuantity(product);
    }

    onSelectOrderBy(sortByField: MatSelectChange) {
        this.activeSortByFieldId = this.sortByFields.find(
            field => field.id === sortByField.value,
        )?.id;
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
        return !!this.cartData.products.length;
    }

    trackBy(_, product?: ICartProduct) {
        return product
            ? `${product.id}${product.quantity}${product.isSelected}`
            : undefined;
    }

    isSomeItemSelected(): boolean {
        return this.cartData.products.some(product => product.isSelected);
    }

    removeSelectedItems() {
        const productsToRemove = this.cartData.products.filter(
            product => product.isSelected,
        );

        this.cartService.removeProducts(productsToRemove);
        this.isCheckAllSelected = false;
    }

    getSortedProducts() {
        return this.orderBy.transform(
            this.cartData.products,
            this.activeSortByFieldId,
            this.isDescOrder,
        );
    }

    onNavigateToCartProduct(cartProductId: string) {
        this.router.navigate([AppPaths.Edit, cartProductId], {
            relativeTo: this.activeRoute,
        });
    }

    onCerateOrder() {
        this.router.navigate([AppPaths.Orders, OrdersPaths.Create]);
    }
}
