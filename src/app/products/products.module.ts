import { NgModule } from '@angular/core';

import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [SharedModule],
    declarations: [ProductComponent, ProductListComponent],
    exports: [ProductComponent, ProductListComponent],
})
export class ProductsModule {}
