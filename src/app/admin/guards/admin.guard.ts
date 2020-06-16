import { Injectable } from '@angular/core';
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService, SnakeService } from '../../shared';

@Injectable({
    providedIn: 'any',
})
export class AdminGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private snake: SnakeService,
    ) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const { userInfo } = this.authService.getAuthData();

        if (!userInfo?.isAdmin) {
            this.snake.show({
                message: 'Sorry, you do not have admin rights',
            });
        }
        return userInfo?.isAdmin;
    }
}
