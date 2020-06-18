import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';

import { IOrder, OrderData } from '../models';
import { AuthService, LocalStorageService } from '../../shared';
import { CartService } from '../../cart';
import { OrdersHttpService } from './orders-http.service';

@Injectable({
    providedIn: 'root',
})
export class OrdersService {
    private orders: IOrder[] = [];
    private userId: string;

    ordersSubject: Subject<IOrder[]> = new Subject();

    constructor(
        private cartService: CartService,
        private authService: AuthService,
        private localStorage: LocalStorageService,
        private ordersHttp: OrdersHttpService,
    ) {
        const { userInfo } = this.authService.getAuthData();
        if (userInfo?.id) {
            this.userId = userInfo.id;
        }
        const userOrdersFromLocalStorage = this.localStorage.getItem<IOrder[]>(
            `orders_${this.userId}`,
        );
        if (userOrdersFromLocalStorage) {
            this.orders = userOrdersFromLocalStorage;
        }
        this.ordersSubject.subscribe(orders => {
            this.localStorage.setItem(`orders_${this.userId}`, orders);
        });
    }

    getUserOrders(userId: string): Observable<IOrder[]> {
        return this.ordersHttp.getUserOrders(userId);
    }

    getAllOrders(): Observable<IOrder[]> {
        return this.ordersHttp.getAllOrders();
    }

    getOrder(id: string): Observable<IOrder | null> {
        return this.ordersHttp.getOrder(id);
    }

    private addOrder(order: IOrder) {
        this.orders.push(order);
        this.updateOrders();
    }

    createNewOrder({
        cost,
        quantity,
        products,
        userId,
    }: OrderData): Observable<IOrder> {
        return this.ordersHttp
            .addOrder({
                userId,
                cost,
                quantity,
                products: [...products],
                date: Date.now(),
                isSelected: false,
            })
            .pipe(
                tap(newOrder => {
                    this.addOrder(newOrder);
                    this.cartService.removeAllProducts().subscribe();
                }),
            );
    }

    updateOrder(id: string, orderToUpdate: IOrder): Observable<IOrder> {
        return this.ordersHttp.updateOrder(id, orderToUpdate).pipe(
            tap(updatedOrder => {
                this.orders = this.orders.filter(order => order.id !== id);
                this.orders.push(orderToUpdate);
                this.updateOrders();
            }),
        );
    }

    removeOrder(id: string) {
        return this.ordersHttp.deleteOrder(id).pipe(
            tap(() => {
                this.orders = this.orders.filter(order => order.id !== id);
                this.updateOrders();
            }),
        );
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

    private updateOrders() {
        this.ordersSubject.next([...this.orders.values()]);
    }
}
