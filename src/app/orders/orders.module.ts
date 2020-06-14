import { NgModule } from '@angular/core';

import { SharedModule } from '../shared';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrderEditLeaveConfirmationComponent } from './components';

@NgModule({
    imports: [SharedModule, OrdersRoutingModule],
    declarations: [
        OrdersRoutingModule.components,
        OrderEditLeaveConfirmationComponent,
    ],
})
export class OrdersModule {}
