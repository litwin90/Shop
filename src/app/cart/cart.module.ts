import { NgModule } from '@angular/core';

import { CartComponent } from './components/cart/cart.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [CartComponent, CartItemComponent],
    exports: [CartComponent],
})
export class CartModule {}
