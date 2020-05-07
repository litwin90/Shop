import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
    declarations: [ProductComponent, ProductListComponent],
    exports: [ProductComponent, ProductListComponent],
    imports: [CommonModule, MatCardModule, MatButtonModule],
    // мне удобно видеть эти массивы в таком порядке
    // imports - то, что нам надо
    // declarations - то, что тут создали
    // exports - то, чем поделились
})
export class ProductsModule { }
