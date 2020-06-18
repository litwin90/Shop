import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoadingSpinnerInterceptor } from './loading-spinner.interceptor';
import { ProductsTimingInterceptor } from './products-timing.interceptor';

export const httpInterceptorsProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: ProductsTimingInterceptor,
        multi: true,
    },
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingSpinnerInterceptor,
        multi: true,
    },
];
