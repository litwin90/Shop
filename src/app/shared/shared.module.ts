import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from '../material';
import { OrderByPipe } from './pipes';
import {
    HighlightOnClickDirective,
    ChangeBackgroundDirective,
} from './directives';
import { BasePageComponent } from './components';

@NgModule({
    imports: [CommonModule, FormsModule, MaterialModule],
    declarations: [
        ChangeBackgroundDirective,
        HighlightOnClickDirective,
        OrderByPipe,
        BasePageComponent,
    ],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ChangeBackgroundDirective,
        HighlightOnClickDirective,
        OrderByPipe,
        BasePageComponent,
    ],
    providers: [OrderByPipe],
})
export class SharedModule {}
