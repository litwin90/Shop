import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ChangeBackgroundDirective } from './directives/change-background.directive';
import { HighlightOnClickDirective } from './directives/highlightOnClick.directive';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { MaterialModule } from '../material/material.module';

@NgModule({
    imports: [CommonModule, FormsModule, MaterialModule],
    declarations: [ChangeBackgroundDirective, HighlightOnClickDirective, OrderByPipe],
    exports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ChangeBackgroundDirective,
        HighlightOnClickDirective,
        OrderByPipe,
    ],
    providers: [OrderByPipe],
})
export class SharedModule {}
