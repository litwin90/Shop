import { Injectable } from '@angular/core';

import { Observable, of, Subject } from 'rxjs';
import { tap, finalize, delay } from 'rxjs/operators';

import { IOrder, OrderData } from '../models';
import {
    SnakeService,
    SpinnerService,
    REQUESTS_DELAY,
    GeneratorService,
    AuthService,
    LocalStorageService,
} from '../../shared';
import { CartService } from '../../cart';

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    private orders: Map<string, IOrder> = new Map();
    private userId: string;

    ordersSubject: Subject<IOrder[]> = new Subject();

    constructor(
        private cartService: CartService,
        private generator: GeneratorService,
        private snake: SnakeService,
        private spinner: SpinnerService,
        private authService: AuthService,
        private localStorage: LocalStorageService,
    ) {
        const userOrdersFromLocalStorage = this.localStorage.getItem(
            `orders_${this.userId}`,
        ) as IOrder[];
        if (userOrdersFromLocalStorage) {
            this.orders = userOrdersFromLocalStorage.reduce<
                Map<string, IOrder>
            >((ordersMap, order) => {
                ordersMap.set(order.id, order);
                return ordersMap;
            }, new Map());
        }
        const { userInfo } = this.authService.getAuthData();
        if (userInfo?.userId) {
            this.userId = userInfo.userId;
        }
        this.ordersSubject.subscribe(orders => {
            this.localStorage.setItem(`orders_${this.userId}`, orders);
        });
    }

    getUserOrders(userId: string): Observable<IOrder[]> {
        return of(
            [...this.orders.values()].filter(order => order.userId === userId),
        ).pipe(
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

    getAllOrders(): Observable<IOrder[]> {
        return of([...this.orders.values()]).pipe(
            tap(orders => {
                this.spinner.show();
                if (!orders.length) {
                    this.snake.show({
                        message: 'There are not any orders yet',
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
        userId,
    }: OrderData): Observable<IOrder> {
        const order: IOrder = {
            id: this.generator.getRandomString(10),
            userId,
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
