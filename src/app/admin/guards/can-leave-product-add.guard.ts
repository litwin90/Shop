import { Injectable } from '@angular/core';
import { UrlTree, CanDeactivate } from '@angular/router';

import { Observable } from 'rxjs';

import { CanComponentDeactivate } from '../../shared';

@Injectable({
    providedIn: 'any',
})
export class CanLeaveProductAddGuard
    implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(
        component: CanComponentDeactivate,
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return component.canDeactivate();
    }
}
