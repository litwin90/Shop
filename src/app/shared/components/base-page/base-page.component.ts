import {
    Component,
    Input,
    ChangeDetectionStrategy,
    ViewChild,
    ElementRef,
    Renderer2,
    AfterViewInit,
} from '@angular/core';

import { FlexDirection } from './base-page.model';

@Component({
    selector: 'app-base-page',
    templateUrl: './base-page.component.html',
    styleUrls: ['./base-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasePageComponent implements AfterViewInit {
    @Input() title: string;
    @Input() flexDirection = FlexDirection.Row;

    @ViewChild('content') content: ElementRef<HTMLElement>;

    constructor(private renderer: Renderer2) {}

    ngAfterViewInit(): void {
        this.renderer.setStyle(
            this.content.nativeElement,
            'flexDirection',
            this.flexDirection,
        );
    }
}
