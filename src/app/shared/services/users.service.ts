import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IBaseUserInfo, IUserInfo } from '../models';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    constructor(private httpClient: HttpClient) {}

    getUser(id: string): Observable<IBaseUserInfo> {
        return this.httpClient
            .get(`${environment.apiUrl}/${environment.apiUsersPrefix}/${id}`)
            .pipe(map((userInfo: IBaseUserInfo) => userInfo));
    }

    getUsers(): Observable<IBaseUserInfo[]> {
        return this.httpClient
            .get(`${environment.apiUrl}/${environment.apiUsersPrefix}`)
            .pipe(map((userInfos: IBaseUserInfo[]) => userInfos));
    }

    addUser(userData: Omit<IBaseUserInfo, 'id'>): Observable<IBaseUserInfo> {
        const baseUser = {
            ...userData,
        };
        return this.httpClient
            .post(
                `${environment.apiUrl}/${environment.apiUsersPrefix}`,
                baseUser,
            )
            .pipe(map((newUser: IBaseUserInfo) => newUser));
    }
}
