import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared';

@NgModule({
    declarations: [AdminRoutingModule.components],
    imports: [AdminRoutingModule, SharedModule],
})
export class AdminModule {}
