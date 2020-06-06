import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material';
import { OrderByPipe } from './pipes';
import {
    HighlightOnClickDirective,
    ChangeBackgroundDirective,
    StopPropagationDirective,
} from './directives';
import { BasePageComponent, AuthButtonComponent } from './components';

@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, MaterialModule],
    declarations: [
        ChangeBackgroundDirective,
        HighlightOnClickDirective,
        OrderByPipe,
        BasePageComponent,
        AuthButtonComponent,
        StopPropagationDirective,
    ],
    exports: [
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
    ],
    providers: [OrderByPipe],
})
export class SharedModule {}
