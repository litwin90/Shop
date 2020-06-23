import { CommonModule, TitleCasePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '../material';
import {
    AppNavComponent, AuthButtonComponent, BasePageComponent, ConfirmationComponent
} from './components';
import {
    ChangeBackgroundDirective, HighlightOnClickDirective, StopPropagationDirective
} from './directives';
import { httpInterceptorsProviders } from './interceptors';
import { OrderByPipe } from './pipes';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        RouterModule,
        HttpClientModule,
    ],
    declarations: [
        ChangeBackgroundDirective,
        HighlightOnClickDirective,
        OrderByPipe,
        BasePageComponent,
        AuthButtonComponent,
        StopPropagationDirective,
        ConfirmationComponent,
        AppNavComponent,
    ],
    exports: [
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialModule,
        ChangeBackgroundDirective,
        HighlightOnClickDirective,
        OrderByPipe,
        BasePageComponent,
        AuthButtonComponent,
        StopPropagationDirective,
        AppNavComponent,
        HttpClientModule,
    ],
    providers: [httpInterceptorsProviders, OrderByPipe, TitleCasePipe],
})
export class SharedModule {}
