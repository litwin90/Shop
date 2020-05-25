import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';

const MaterialModules = [
    MatDividerModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
];

@NgModule({
    // можно попробовать не импортировать модули сюда, так как тут нет компонент,
    // которые используют директивы этих модулей
    imports: [MaterialModules],
    exports: [MaterialModules],
})
export class MaterialModule {}
