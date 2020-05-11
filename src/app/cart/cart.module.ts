import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';

@NgModule({
    declarations: [CartComponent, CartItemComponent],
    exports: [CartComponent],
    imports: [
        CommonModule,
        FormsModule,
        MatDividerModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
    ],
})
export class CartModule {}
