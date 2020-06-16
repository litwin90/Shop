import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { ConfirmationComponent } from '../components/confirmation';
import { IConfirmationDialogOptions } from '../models';

@Injectable({
    providedIn: 'any',
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
