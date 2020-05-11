import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangeBackgroundDirective } from './directives/change-background.directive';

@NgModule({
    declarations: [ChangeBackgroundDirective],
    exports: [ChangeBackgroundDirective],
    imports: [CommonModule],
})
export class SharedModule {}
