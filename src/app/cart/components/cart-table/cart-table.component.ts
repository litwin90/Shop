import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Data } from '@angular/router';
import { MatSelectChange } from '@angular/material/select';
import { MatCheckboxChange } from '@angular/material/checkbox';

import { pluck } from 'rxjs/operators';

import {
    OrderByPipe,
    AppPath,
    HOVER_BACKGROUND_COLOR,
    WithRouteData,
    AppSettingsService,
    SortOrder,
} from '../../../shared';
import {
    ICartProduct,
    ICartSortByField,
    ICartSortByFieldId,
    ICartData,
} from '../../models';
import { OrdersPath } from '../../../orders/orders.constants';
import { CartService } from '../../services';
import { merge } from 'rxjs';

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
    isDescOrder: boolean;
    isCheckAllSelected = false;
    HOVER_BACKGROUND_COLOR = HOVER_BACKGROUND_COLOR;

    private activeSortByFieldId: ICartSortByFieldId = 'name';

    constructor(
        private cartService: CartService,
        private orderBy: OrderByPipe,
        private router: Router,
        private activeRoute: ActivatedRoute,
        private settings: AppSettingsService,
    ) {
        super(activeRoute);
    }

    ngOnInit(): void {
        const cartData$ = merge(
            this.cartService.cartDataSubject,
            this.activeRoute.data.pipe(pluck<Data, ICartData>('cartData')),
        ).subscribe(cartData => this.updateCartData(cartData));
        this.subscriptions.push(cartData$);
    }

    private updateCartData(cartData: ICartData) {
        this.cartData = cartData;
        if (cartData.settings) {
            this.activeSortByFieldId = cartData.settings.sortBy;
            this.isDescOrder = cartData.settings.sortOrder === SortOrder.Desc;
        }
    }

    private navigateToProductListIfCartIsEmpty() {
        if (!this.cartData.products.length) {
            this.router.navigate([AppPath.ProductsList]);
        }
    }

    onIncrease(product: ICartProduct) {
        this.cartService.increaseQuantity(product.id).subscribe();
    }

    onDecrease(product: ICartProduct) {
        this.cartService.decreaseQuantity(product).subscribe(() => {
            this.navigateToProductListIfCartIsEmpty();
        });
    }

    onSelectOrderBy(sortByField: MatSelectChange) {
        const newSortBy = this.sortByFields.find(
            field => field.id === sortByField.value,
        )?.id;
        this.settings.updateCartSortBy(newSortBy).subscribe(() => {
            this.activeSortByFieldId = newSortBy;
        });
    }

    onToggleOrder() {
        const newOrder = this.isDescOrder ? SortOrder.Asc : SortOrder.Desc;
        this.settings.updateCartSortOrder(newOrder).subscribe();
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
        return !!this.cartData?.products.length;
    }

    trackBy(_, product?: ICartProduct) {
        return product
            ? `${product.id}${product.quantity}${product.isSelected}`
            : undefined;
    }

    isSomeItemSelected(): boolean {
        return this.cartData.products.some(product => product.isSelected);
    }

    onRemoveSelectedItems() {
        const productsToRemove = this.cartData.products.filter(
            product => product.isSelected,
        );

        this.cartService.removeProducts(productsToRemove).subscribe(() => {
            this.isCheckAllSelected = false;
            this.navigateToProductListIfCartIsEmpty();
        });
    }

    getSortedProducts() {
        return this.orderBy.transform(
            this.cartData.products,
            this.activeSortByFieldId,
            this.isDescOrder,
        );
    }

    onNavigateToCartProduct(cartProductId: string) {
        this.router.navigate([AppPath.Edit, cartProductId], {
            relativeTo: this.activeRoute,
        });
    }

    onCerateOrder() {
        this.router.navigate([AppPath.Orders, OrdersPath.Create]);
    }
}
