import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { FirstComponent } from './components/first/first.component';

@NgModule({
    declarations: [FirstComponent],
    exports: [FirstComponent],
    imports: [CommonModule, MatCardModule],
})
export class FirstModule {}
