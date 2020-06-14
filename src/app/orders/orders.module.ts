import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { OrdersRoutingModule } from './orders-routing.module';

@NgModule({
    imports: [SharedModule, OrdersRoutingModule],
    declarations: [OrdersRoutingModule.components],
})
export class OrdersModule {}
