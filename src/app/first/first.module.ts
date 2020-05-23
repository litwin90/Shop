import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';

import { FirstComponent } from './components/first/first.component';

@NgModule({
    imports: [CommonModule, MatCardModule],
    declarations: [FirstComponent],
    exports: [FirstComponent],
})
export class FirstModule {}
