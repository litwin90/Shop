import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder, IBaseOrder } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'any',
})
export class OrdersHttpService {
    constructor(private httpClient: HttpClient) {}

    getUserOrders(userId: string): Observable<IOrder[]> {
        return this.httpClient
            .get<IBaseOrder[]>(
                `${environment.apiUrl}/${environment.apiOrdersPrefix}?userId=${userId}`,
            )
            .pipe(
                map(orders =>
                    orders.map(order => this.transformBaseOrderToOrder(order)),
                ),
            );
    }

    getAllOrders(): Observable<IOrder[]> {
        return this.httpClient
            .get<IBaseOrder[]>(
                `${environment.apiUrl}/${environment.apiOrdersPrefix}`,
            )
            .pipe(
                map(orders =>
                    orders.map(order => this.transformBaseOrderToOrder(order)),
                ),
            );
    }

    getOrder(id: string): Observable<IOrder> {
        return this.httpClient
            .get<IBaseOrder>(
                `${environment.apiUrl}/${environment.apiOrdersPrefix}/${id}`,
            )
            .pipe(map(this.transformBaseOrderToOrder));
    }

    addOrder(order: Omit<IOrder, 'id'>): Observable<IOrder> {
        return this.httpClient
            .post<IBaseOrder>(
                `${environment.apiUrl}/${environment.apiOrdersPrefix}`,
                this.transformOrderToBaseOrder(order),
            )
            .pipe(map(this.transformBaseOrderToOrder));
    }

    updateOrder(id: string, updatedOrder: IOrder): Observable<IOrder> {
        return this.httpClient
            .put<IBaseOrder>(
                `${environment.apiUrl}/${environment.apiOrdersPrefix}/${id}`,
                this.transformOrderToBaseOrder(updatedOrder),
            )
            .pipe(map(this.transformBaseOrderToOrder));
    }

    deleteOrder(id: string) {
        return this.httpClient.delete(
            `${environment.apiUrl}/${environment.apiOrdersPrefix}/${id}`,
        );
    }

    private transformOrderToBaseOrder({
        quantity,
        cost,
        products,
        date,
        userId,
    }: Omit<IOrder, 'id'>): Omit<IBaseOrder, 'id'> {
        return {
            quantity,
            cost,
            products,
            date,
            userId,
        };
    }

    private transformBaseOrderToOrder(baseOrder: IBaseOrder): IOrder {
        return {
            ...baseOrder,
            isSelected: false,
        };
    }
}
