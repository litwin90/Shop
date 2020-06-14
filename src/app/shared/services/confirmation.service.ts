import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ConfirmationComponent } from '../components';
import { IConfirmationDialogOptions } from '../models';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class ConfirmationService {
    constructor(public dialog: MatDialog) {}

    askConfirmation({
        title = 'Confirmation',
        message,
        acceptButtonText = 'Yes',
        declineButtonText = 'No',
        acceptAction,
        declineAction,
    }: IConfirmationDialogOptions): Observable<boolean> {
        const dialogRef = this.dialog.open(ConfirmationComponent, {
            data: {
                title,
                message,
                acceptButtonText,
                declineButtonText,
            },
        });

        return dialogRef.afterClosed().pipe(
            tap(isConfirmed => {
                if (isConfirmed && acceptAction) {
                    acceptAction();
                } else if (declineAction) {
                    declineAction();
                }
            }),
        );
    }
}
