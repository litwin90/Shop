import { NgModule } from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    exports: [
        MatDividerModule,
        MatCardModule,
        MatListModule,
        MatIconModule,
        MatButtonModule,
        MatCheckboxModule,
        MatSelectModule,
        MatTabsModule,
        MatSnackBarModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatFormFieldModule,
        MatInputModule,
    ],
})
export class MaterialModule {}
