import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-base-page',
    templateUrl: './base-page.component.html',
    styleUrls: ['./base-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasePageComponent {
    @Input() title: string;
}
