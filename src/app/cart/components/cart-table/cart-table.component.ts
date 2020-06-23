import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute, Data } from '@angular/router';

import { merge } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { RouterFacade } from '../../../router-state';
import { AppSettingsService, OrderByPipe, SortOrder, WithSubscriptions } from '../../../shared';
import { HOVER_BACKGROUND_COLOR } from '../../../shared/shared.constants';
import { ICartData, ICartProduct, ICartSortByField, ICartSortByFieldId } from '../../models';
import { CartService } from '../../services';

@Component({
    templateUrl: './cart-table.component.html',
    styleUrls: ['./cart-table.component.scss'],
})
export class CartTableComponent extends WithSubscriptions implements OnInit {
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
        private routerFacade: RouterFacade,
        private activeRoute: ActivatedRoute,
        private settings: AppSettingsService,
    ) {
        super();
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
            this.routerFacade.goToProducts();
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
        this.routerFacade.goToEditCartProduct(cartProductId);
    }

    onCerateOrder() {
        this.routerFacade.goToOrderCreate();
    }
}
