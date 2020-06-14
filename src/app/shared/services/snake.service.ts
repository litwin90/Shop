import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TitleCasePipe } from '@angular/common';

@Injectable({
    providedIn: 'root',
})
export class SnakeService {
    constructor(
        private snackBar: MatSnackBar,
        private titleCase: TitleCasePipe,
    ) {}

    show({
        message,
        action,
        duration,
    }: {
        message: string;
        action?: string;
        duration?: number;
    }) {
        this.snackBar.open(this.titleCase.transform(message), action, {
            duration: duration || 2000,
        });
    }

    hide() {
        this.snackBar.dismiss();
    }
}
