import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { REQUESTS_DELAY } from '../shared.constants';

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {
    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(delay(REQUESTS_DELAY));
    }
}
