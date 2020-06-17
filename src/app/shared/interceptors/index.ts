import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { LoadingSpinnerInterceptor } from './loading-spinner.interceptor';

export const httpInterceptorsProviders = [
    {
        provide: HTTP_INTERCEPTORS,
        useClass: LoadingSpinnerInterceptor,
        multi: true,
    },
];
