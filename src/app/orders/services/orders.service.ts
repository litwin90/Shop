import { Injectable, Inject } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';

import { IOrder, OrderData } from '../models';
import {
    CartService,
    SnakeService,
    SpinnerService,
    REQUESTS_DELAY,
} from '../../shared';
import { GeneratorService } from '../../core';
import { tap, finalize, catchError, delay } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    private orders: Map<string, IOrder> = new Map();

    ordersSubject: Subject<IOrder[]> = new Subject();

    constructor(
        private cartService: CartService,
        private generator: GeneratorService,
        private snake: SnakeService,
        private spinner: SpinnerService,
    ) {}

    getUserOrders(): Observable<IOrder[]> {
        return of([...this.orders.values()]).pipe(
            tap(orders => {
                this.spinner.show();
                if (!orders.length) {
                    this.snake.show({
                        message: 'You do not have any orders yet',
                    });
                }
            }),
            finalize(() => {
                this.spinner.hide();
            }),
        );
    }

    getOrder(id: string): Observable<IOrder | null> {
        return of(this.orders.get(id)).pipe(
            tap(order => {
                this.spinner.show();
                if (!order) {
                    this.snake.show({
                        message: 'Unable to get order',
                    });
                }
            }),
            finalize(() => {
                this.spinner.hide();
            }),
        );
    }

    addOrder(order: IOrder) {
        this.orders.set(order.id, order);
        this.pushNewSubjectEvent();
    }

    createNewOrder({
        cost,
        quantity,
        products,
    }: OrderData): Observable<IOrder> {
        const order: IOrder = {
            id: this.generator.getRandomString(10),
            cost,
            quantity,
            products: [...products],
            date: Date.now(),
        };
        this.addOrder(order);
        this.cartService.removeAllProducts();
        return of(order).pipe(
            tap(() => this.spinner.show()),
            delay(REQUESTS_DELAY),
            finalize(() => {
                this.spinner.hide();
                this.snake.show({ message: 'Order have been created' });
            }),
        );
    }

    updateOrder(
        id: string,
        updatedOrder: Partial<IOrder>,
    ): Observable<IOrder | null> {
        const order = this.orders.get(id);

        if (order) {
            [...Object.keys(updatedOrder)].forEach(key => {
                order[key] = updatedOrder[key];
            });
            this.pushNewSubjectEvent();
            return of(order).pipe(
                tap(() => this.spinner.show()),
                delay(REQUESTS_DELAY),
                finalize(() => {
                    this.spinner.hide();
                }),
            );
        } else {
            return of(null).pipe(
                tap(() => {
                    this.snake.show({ message: 'Unable to update order' });
                    this.spinner.show();
                }),
                delay(REQUESTS_DELAY),
                finalize(() => {
                    this.spinner.hide();
                    this.snake.show({ message: 'Unable to update order' });
                }),
            );
        }
    }

    removeOrder(id: string) {
        this.orders.delete(id);
        this.pushNewSubjectEvent();
    }

    updateOrderCommonData(order: IOrder): IOrder {
        return {
            ...order,
            quantity: this.updateOrderTotalQuantity(order),
            cost: this.updateOrderTotalCost(order),
        };
    }

    private updateOrderTotalQuantity(order: IOrder): number {
        return order.products.reduce((quantity, product) => {
            return quantity + product.quantity;
        }, 0);
    }

    private updateOrderTotalCost(order: IOrder): number {
        return order.products.reduce((cost, product) => {
            return cost + product.price * product.quantity;
        }, 0);
    }

    private pushNewSubjectEvent() {
        this.ordersSubject.next([...this.orders.values()]);
    }
}
