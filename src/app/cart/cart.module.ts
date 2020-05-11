import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './cart-item/cart-item.component';

@NgModule({
    declarations: [CartComponent, CartItemComponent],
    exports: [CartComponent],
    imports: [CommonModule, MatDividerModule, MatCardModule, MatListModule, MatIconModule, MatButtonModule],
})
export class CartModule {}
