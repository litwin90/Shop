import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [ProductComponent, ProductListComponent],
    exports: [ProductComponent, ProductListComponent],
    imports: [CommonModule, MatCardModule, MatButtonModule, SharedModule],
})
export class ProductsModule {}
