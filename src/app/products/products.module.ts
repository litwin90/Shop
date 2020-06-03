import { NgModule } from '@angular/core';

import { ProductComponent } from './components';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared';

@NgModule({
    imports: [SharedModule, ProductsRoutingModule],
    declarations: [ProductsRoutingModule.components, ProductComponent],
})
export class ProductsModule {}
