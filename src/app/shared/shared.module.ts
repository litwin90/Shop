import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material';
import { OrderByPipe } from './pipes';
import {
    HighlightOnClickDirective,
    ChangeBackgroundDirective,
} from './directives';
import { BasePageComponent, AuthButtonComponent } from './components';

@NgModule({
    imports: [CommonModule, FormsModule, MaterialModule],
    declarations: [
        ChangeBackgroundDirective,
        HighlightOnClickDirective,
        OrderByPipe,
        BasePageComponent,
        AuthButtonComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ChangeBackgroundDirective,
        HighlightOnClickDirective,
        OrderByPipe,
        BasePageComponent,
        AuthButtonComponent,
    ],
    providers: [OrderByPipe],
})
export class SharedModule {}
