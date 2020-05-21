import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeBackgroundDirective } from './directives/change-background.directive';
import { HighlightOnClickDirective } from './directives/highlightOnClick.directive';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';

@NgModule({
    declarations: [ChangeBackgroundDirective, HighlightOnClickDirective, OrderByPipe],
    exports: [ChangeBackgroundDirective, HighlightOnClickDirective],
    imports: [CommonModule],
})
export class SharedModule {}
