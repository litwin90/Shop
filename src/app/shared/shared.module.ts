import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeBackgroundDirective } from './directives/change-background.directive';
import { HighlightOnClickDirective } from './directives/highlightOnClick.directive';

@NgModule({
    declarations: [ChangeBackgroundDirective, HighlightOnClickDirective],
    exports: [ChangeBackgroundDirective, HighlightOnClickDirective],
    imports: [CommonModule],
})
export class SharedModule {}
