export interface IConfirmationDialogOptions {
    title?: string;
    message: string;
    acceptButtonText?: string;
    declineButtonText?: string;
    acceptAction?: () => void;
    declineAction?: () => void;
}
