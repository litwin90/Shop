import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { CartComponent } from './components/cart/cart.component';

@NgModule({
    declarations: [CartComponent],
    exports: [CartComponent],
    imports: [CommonModule, MatListModule, MatCardModule],
})
export class CartModule {}
