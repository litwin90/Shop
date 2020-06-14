import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-order-edit-leave-confirmation',
    templateUrl: './order-edit-leave-confirmation.component.html',
    styleUrls: ['./order-edit-leave-confirmation.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderEditLeaveConfirmationComponent implements OnInit {
    constructor() {}

    ngOnInit(): void {}
}
