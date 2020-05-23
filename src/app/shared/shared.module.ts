import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeBackgroundDirective } from './directives/change-background.directive';
import { HighlightOnClickDirective } from './directives/highlightOnClick.directive';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';

@NgModule({
    imports: [CommonModule],
    declarations: [ChangeBackgroundDirective, HighlightOnClickDirective, OrderByPipe],
    exports: [ChangeBackgroundDirective, HighlightOnClickDirective, OrderByPipe],
    providers: [OrderByPipe],
})
export class SharedModule {}
