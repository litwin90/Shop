import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Observable, of } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { ICartProduct } from '../../../cart';
import { WithSubscriptions } from '../../../shared';
import { ConfirmationService } from '../../../shared/services/confirmation.service';
import { RouterFacade } from '../../../state';
import { IOrder } from '../../models';
import { OrdersService } from '../../services';

@Component({
    selector: 'app-edit-order',
    templateUrl: './edit-order.component.html',
    styleUrls: ['./edit-order.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditOrderComponent extends WithSubscriptions implements OnInit {
    order: IOrder;
    initialOrderSnapshot: string;

    quantityControl: FormControl;
    options: FormGroup;

    constructor(
        private routerFacade: RouterFacade,
        private activeRoute: ActivatedRoute,
        private ordersService: OrdersService,
        private formBuilder: FormBuilder,
        private confirmation: ConfirmationService,
    ) {
        super();
    }

    ngOnInit(): void {
        const activeRoute$ = this.activeRoute.data
            .pipe(pluck('order'))
            .subscribe((order: IOrder) => {
                this.order = order;
                this.initialOrderSnapshot = JSON.stringify(order);
                this.configureForm();
            });
        this.subscriptions.push(activeRoute$);
    }

    onSave() {
        this.ordersService
            .updateOrder(this.order.id, this.order)
            .subscribe(order => {
                if (order) {
                    this.initialOrderSnapshot = JSON.stringify(order);
                    this.routerFacade.goToOrders();
                }
            });
    }

    onDecline() {
        this.restoreOrder();
        this.routerFacade.goToOrders();
    }

    onChangeProductQuantity(product: ICartProduct) {
        product.quantity = this.options.get('quantity').value;
        this.updateOrder();
    }

    onRemoveFromOrder({ id }: ICartProduct) {
        const updatedProducts = this.order.products.filter(
            product => product.id !== id,
        );

        if (!updatedProducts.length) {
            this.confirmation
                .ask({
                    message:
                        'Are you sure you want to remove last product from order? Order will be declined.',
                    acceptAction: () => {
                        this.ordersService
                            .removeOrder(this.order.id)
                            .subscribe();
                        this.routerFacade.goToOrders();
                    },
                })
                .subscribe();
        } else {
            this.order.products = updatedProducts;
            this.updateOrder();
        }
    }

    onRemoveOrder() {
        this.confirmation
            .ask({
                message: 'Are you sure you wand to remove order?',
                acceptAction: () => {
                    this.ordersService.removeOrder(this.order.id).subscribe();
                    this.routerFacade.goToOrders();
                },
            })
            .subscribe();
    }

    private restoreOrder() {
        this.order = JSON.parse(this.initialOrderSnapshot);
    }

    private updateOrder() {
        this.order = this.ordersService.updateOrderCommonData(this.order);
    }

    private configureForm() {
        this.quantityControl = new FormControl(
            this.order.quantity,
            Validators.min(1),
        );
        this.options = this.formBuilder.group({
            quantity: this.quantityControl,
        });
    }

    isOrderChanged(): boolean {
        return this.initialOrderSnapshot !== JSON.stringify(this.order);
    }

    canDeactivate(): Observable<boolean> {
        if (this.isOrderChanged() && this.order) {
            return this.confirmation.ask({
                message:
                    'Are you sure to leave order edit form? Order data is not saved',
            });
        } else {
            return of(true);
        }
    }
}
