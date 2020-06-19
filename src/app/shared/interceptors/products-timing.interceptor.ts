import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class ProductsTimingInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler,
    ): Observable<HttpEvent<unknown>> {
        const startDate = Date.now();
        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
                if (
                    event instanceof HttpResponse &&
                    event.url.includes(environment.apiProductsPrefix)
                ) {
                    const requestTiming = Date.now() - startDate;
                    console.log(`Products request timing: ${requestTiming}`);
                }
                return event;
            }),
        );
    }
}
