import { NgModule } from '@angular/core';

import { CartItemComponent } from './components/cart-item/cart-item.component';
import { SharedModule } from '../shared/shared.module';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';

@NgModule({
    imports: [SharedModule, CartRoutingModule],
    declarations: [CartRoutingModule.components, CartItemComponent, CartComponent],
})
export class CartModule {}
