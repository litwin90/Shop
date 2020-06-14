import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
    FormGroup,
    FormControl,
    Validators,
    FormBuilder,
} from '@angular/forms';

import { Observable, of } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { FlexDirection, AppPaths, WithSubscriptions } from '../../../shared';
import { IOrder } from '../../models';
import { OrdersService } from '../../services';
import { ICartProduct } from '../../../cart';
import { ConfirmationService } from '../../../shared/services/confirmation.service';

@Component({
    selector: 'app-edit-order',
    templateUrl: './edit-order.component.html',
    styleUrls: ['./edit-order.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditOrderComponent extends WithSubscriptions implements OnInit {
    order: IOrder;
    initialOrderSnapshot: string;
    FlexDirection = FlexDirection;

    quantityControl: FormControl;
    options: FormGroup;

    constructor(
        private router: Router,
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
                    this.router.navigate([AppPaths.Orders]);
                }
            });
    }

    onDecline() {
        this.restoreOrder();
        this.router.navigate([AppPaths.Orders]);
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
                .askConfirmation({
                    message:
                        'Are you sure you want to remove last product from order? Order will be declined.',
                    acceptAction: () => {
                        this.ordersService.removeOrder(this.order.id);
                        this.router.navigate([AppPaths.Orders]);
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
            .askConfirmation({
                message: 'Are you sure you wand to remove order?',
                acceptAction: () => {
                    this.ordersService.removeOrder(this.order.id);
                    this.router.navigate([AppPaths.Orders]);
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
            return this.confirmation.askConfirmation({
                message:
                    'Are you sure to leave order edit form? Order data is not saved',
            });
        } else {
            return of(true);
        }
    }
}
