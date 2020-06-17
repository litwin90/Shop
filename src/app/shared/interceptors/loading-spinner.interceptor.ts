import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { tap, delay, finalize } from 'rxjs/operators';

import { SpinnerService } from '../services';
import { REQUESTS_DELAY } from '../shared.constants';

@Injectable()
export class LoadingSpinnerInterceptor implements HttpInterceptor {
    constructor(private spinner: SpinnerService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        this.spinner.show();
        return next.handle(request).pipe(
            delay(REQUESTS_DELAY),
            finalize(() => {
                this.spinner.hide();
            }),
        );
    }
}
