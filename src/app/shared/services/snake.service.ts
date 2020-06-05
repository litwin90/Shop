import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnakeService {
    constructor(private snackBar: MatSnackBar) {}

    showSnake(message: string, action?: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }

    hideSnake() {
        this.snackBar.dismiss();
    }
}
