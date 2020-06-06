import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
    providedIn: 'root',
})
export class SnakeService {
    constructor(private snackBar: MatSnackBar) {}

    showSnake({
        message,
        action,
        duration,
    }: {
        message: string;
        action?: string;
        duration?: number;
    }) {
        this.snackBar.open(message, action, {
            duration: duration || 2000,
        });
    }

    hideSnake() {
        this.snackBar.dismiss();
    }
}
