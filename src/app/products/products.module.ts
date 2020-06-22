import { NgModule } from '@angular/core';

import { ProductCardComponent } from './components';
import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared';

@NgModule({
    imports: [SharedModule, ProductsRoutingModule],
    declarations: [ProductsRoutingModule.components, ProductCardComponent],
})
export class ProductsModule {}
