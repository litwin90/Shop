import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, merge, Subject } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';

import { LocalStorageService } from './local-storage.service';
import { IAppSetting, SortOrder } from '../models';
import { environment } from '../../../environments/environment';
import { APP_SETTINGS } from '../shared.constants';
import { AuthService } from './auth.service';
import { ICartSortByFieldId } from '../../cart';

@Injectable({
    providedIn: 'root',
})
export class AppSettingsService {
    private userId: string;

    settingsSubject: Subject<IAppSetting> = new Subject();

    constructor(
        private localStorage: LocalStorageService,
        private http: HttpClient,
        private authService: AuthService,
    ) {
        this.authService.authSubject.subscribe(({ userInfo }) => {
            if (userInfo) {
                this.userId = userInfo.id;
            }
        });
    }

    get(): Observable<IAppSetting> {
        return of(this.getLSSettings()).pipe(
            switchMap(settings =>
                settings ? of(settings) : this.getDBSettings(),
            ),
            switchMap(settings =>
                settings
                    ? of(settings)
                    : this.userId
                    ? this.set({ userId: this.userId, ...APP_SETTINGS })
                    : of({ id: 'FAKE_ID', userId: 'FAKE_ID', ...APP_SETTINGS }),
            ),
        );
    }

    set(settings: Omit<IAppSetting, 'id'>): Observable<IAppSetting> {
        return this.http
            .post<IAppSetting>(
                `${environment.apiUrl}/${environment.apiSettingsPrefix}`,
                settings,
            )
            .pipe(
                tap(dbSettings => {
                    this.setLSSettings(dbSettings);
                    this.settingsSubject.next(dbSettings);
                }),
            );
    }

    update(settings: IAppSetting): Observable<IAppSetting> {
        return this.http
            .put<IAppSetting>(
                `${environment.apiUrl}/${environment.apiSettingsPrefix}/${settings.id}`,
                settings,
            )
            .pipe(
                tap(dbSettings => {
                    this.setLSSettings(dbSettings);
                    this.settingsSubject.next(dbSettings);
                }),
            );
    }

    updateCartSortBy(sortBy: ICartSortByFieldId) {
        return this.get().pipe(
            switchMap(setting => {
                const newSetting: IAppSetting = {
                    ...setting,
                    cart: {
                        sortBy,
                        sortOrder: setting.cart.sortOrder,
                    },
                };
                return this.update(newSetting);
            }),
        );
    }

    updateCartSortOrder(sortOrder: SortOrder) {
        return this.get().pipe(
            switchMap(setting => {
                const newSetting: IAppSetting = {
                    ...setting,
                    cart: {
                        sortBy: setting.cart.sortBy,
                        sortOrder,
                    },
                };
                return this.update(newSetting);
            }),
        );
    }

    private getDBSettings(): Observable<IAppSetting> {
        return this.http
            .get<IAppSetting[]>(
                `${environment.apiUrl}/${environment.apiSettingsPrefix}?userId=${this.userId}`,
            )
            .pipe(
                map(settings => {
                    const setting = settings[0];
                    this.setLSSettings(setting);
                    return setting;
                }),
            );
    }

    private getLSSettings(): IAppSetting {
        return this.localStorage.getItem<IAppSetting>(
            `${environment.LSSettingsKey}_${this.userId}`,
        );
    }

    private setLSSettings(settings: IAppSetting) {
        if (settings) {
            this.localStorage.setItem(
                `${environment.LSSettingsKey}_${settings.userId}`,
                settings,
            );
        }
    }
}
