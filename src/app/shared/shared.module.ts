import { NgModule } from '@angular/core';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MaterialModule } from '../material';
import { OrderByPipe } from './pipes';
import {
    HighlightOnClickDirective,
    ChangeBackgroundDirective,
    StopPropagationDirective,
} from './directives';
import {
    BasePageComponent,
    AuthButtonComponent,
    ConfirmationComponent,
    AppNavComponent,
} from './components';

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
    providers: [OrderByPipe, TitleCasePipe],
})
export class SharedModule {}
