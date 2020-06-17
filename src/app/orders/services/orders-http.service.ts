import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../models';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'any',
})
export class OrdersHttpService {
    constructor(private httpClient: HttpClient) {}

    getUserOrders(userId: string): Observable<IOrder[]> {
        return this.httpClient.get<IOrder[]>(
            `${environment.apiUrl}/${environment.apiOrdersPrefix}?userId=${userId}`,
        );
    }

    getAllOrders(): Observable<IOrder[]> {
        return this.httpClient.get<IOrder[]>(
            `${environment.apiUrl}/${environment.apiOrdersPrefix}`,
        );
    }

    getOrder(id: string): Observable<IOrder | null> {
        return this.httpClient.get<IOrder | null>(
            `${environment.apiUrl}/${environment.apiOrdersPrefix}/${id}`,
        );
    }

    addOrder(order: Omit<IOrder, 'id'>): Observable<IOrder> {
        return this.httpClient.post<IOrder>(
            `${environment.apiUrl}/${environment.apiOrdersPrefix}`,
            order,
        );
    }

    updateOrder(id: string, updatedOrder: IOrder): Observable<IOrder> {
        return this.httpClient.put<IOrder>(
            `${environment.apiUrl}/${environment.apiOrdersPrefix}/${id}`,
            updatedOrder,
        );
    }

    deleteOrder(id: string) {
        return this.httpClient.delete(
            `${environment.apiUrl}/${environment.apiOrdersPrefix}/${id}`,
        );
    }
}
