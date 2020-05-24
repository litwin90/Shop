import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';
import { ProductComponent } from './components/product/product.component';

@NgModule({
    imports: [SharedModule, ProductsRoutingModule],
    declarations: [ProductsRoutingModule.components, ProductComponent],
})
export class ProductsModule {}
