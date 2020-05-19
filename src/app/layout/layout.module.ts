import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';

@NgModule({
    declarations: [AboutComponent],
    exports: [AboutComponent],
    imports: [CommonModule],
})
export class LayoutModule {}
