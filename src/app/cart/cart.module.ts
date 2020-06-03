import { NgModule } from '@angular/core';

import { CartItemComponent } from './components';
import { SharedModule } from '../shared';
import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';

@NgModule({
    imports: [SharedModule, CartRoutingModule],
    declarations: [
        CartRoutingModule.components,
        CartItemComponent,
        CartComponent,
    ],
})
export class CartModule {}
