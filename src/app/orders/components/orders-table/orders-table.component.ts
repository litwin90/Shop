import { Component, OnInit } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';

import { pluck } from 'rxjs/operators';

import { ISelectableEntity, OrderByPipe, WithSubscriptions } from '../../../shared';
import { HOVER_BACKGROUND_COLOR } from '../../../shared/shared.constants';
import { RouterFacade } from '../../../state';
import { IOrder, IOrderSortByField, IOrderSortByFieldId } from '../../models';
import { OrdersService } from '../../services';

@Component({
    templateUrl: './orders-table.component.html',
    styleUrls: ['./orders-table.component.scss'],
})
export class OrdersTableComponent extends WithSubscriptions implements OnInit {
    orders: IOrder[] = [];
    HOVER_BACKGROUND_COLOR = HOVER_BACKGROUND_COLOR;
    sortByFields: IOrderSortByField[] = [
        { id: 'date', name: 'Date' },
        { id: 'cost', name: 'Cost' },
        { id: 'quantity', name: 'Quantity' },
    ];
    isDescOrder = true;
    isCheckAllSelected = false;

    private activeSortByFieldId: IOrderSortByFieldId = 'date';

    constructor(
        private activeRoute: ActivatedRoute,
        private routerFacade: RouterFacade,
        private orderService: OrdersService,
        private orderBy: OrderByPipe,
    ) {
        super();
    }

    ngOnInit(): void {
        const activeRoute$ = this.activeRoute.data
            .pipe(pluck('orders'))
            .subscribe((orders: IOrder[] | null) => {
                this.orders = (orders || []).map(order => ({
                    ...order,
                    isSelected: false,
                }));
            });
        this.subscriptions.push(activeRoute$);
    }

    onToggleCheckAll(event: MatCheckboxChange) {
        if (event.checked) {
            this.checkAllOrders();
        } else {
            this.unCheckAllOrders();
        }
    }

    checkAllOrders() {
        this.orders = this.orders.map(order => {
            order.isSelected = true;
            return order;
        });
    }

    unCheckAllOrders() {
        this.orders = this.orders.map(order => {
            order.isSelected = false;
            return order;
        });
    }

    onSelectOrderBy(sortByField: MatSelectChange) {
        this.activeSortByFieldId = this.sortByFields.find(
            field => field.id === sortByField.value,
        )?.id;
    }

    get sortBy(): IOrderSortByFieldId {
        return this.activeSortByFieldId;
    }

    set sortBy(sortBy: IOrderSortByFieldId) {
        this.activeSortByFieldId = sortBy;
    }

    onToggleOrder() {
        this.isDescOrder = !this.isDescOrder;
    }

    onNavigateToOrderDetails({ id }: IOrder) {
        this.routerFacade.goToOrderDetails(id);
    }

    isSomeItemSelected(): boolean {
        return this.orders.some(order => order.isSelected);
    }

    removeSelectedItems() {
        const itemsToRemove = this.orders.filter(product => product.isSelected);

        itemsToRemove.map(({ id }) =>
            this.orderService.removeOrder(id).subscribe(),
        );
        this.isCheckAllSelected = false;
        if (itemsToRemove.length === this.orders.length) {
            this.routerFacade.goToProducts();
        }
    }

    trackBy(_, order?: IOrder & ISelectableEntity) {
        return order
            ? `${order.id}${order.quantity}${order.isSelected}`
            : undefined;
    }

    getSortedOrders() {
        return this.orderBy.transform(
            this.orders,
            this.activeSortByFieldId,
            this.isDescOrder,
        );
    }

    getSelectedOrders(): IOrder[] {
        return this.orders.filter(({ isSelected }) => isSelected);
    }

    getRejectButtonText(): string {
        return this.getSelectedOrders().length > 1
            ? 'Reject Orders'
            : 'Reject Order';
    }
}
