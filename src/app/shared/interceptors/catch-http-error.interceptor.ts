import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { DialogService } from '../services';

@Injectable()
export class CatchHttpErrorInterceptor implements HttpInterceptor {
    constructor(private dialog: DialogService) {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: Error) => {
                this.dialog.show({ message: error.message });
                return throwError(error);
            }),
        );
    }
}
