import {
    Directive,
    Input,
    ElementRef,
    Renderer2,
    HostListener,
    AfterViewInit,
} from '@angular/core';

@Directive({
    selector: '[appHighlightOnClick]',
})
export class HighlightOnClickDirective implements AfterViewInit {
    @Input() backgroundColor = 'red';
    @Input() borderWidth = '2px';
    @Input() borderColor = 'blue';

    private isInitialState = true;

    private initialBackgroundColor: string;
    private initialBorderWidth: string;
    private initialBorderColor: string;
    private initialBorderStyle: string;

    constructor(
        private elementRef: ElementRef<HTMLElement>,
        private renderer: Renderer2,
    ) {}

    ngAfterViewInit(): void {
        this.initialBackgroundColor = this.elementRef.nativeElement.style.backgroundColor;
        this.initialBorderColor = this.elementRef.nativeElement.style.borderColor;
        this.initialBorderWidth = this.elementRef.nativeElement.style.borderWidth;
        this.initialBorderStyle = this.elementRef.nativeElement.style.borderStyle;
    }

    @HostListener('click')
    onClick() {
        this.toggleHighlight();
    }

    toggleHighlight() {
        this.isInitialState = !this.isInitialState;

        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'backgroundColor',
            this.isInitialState
                ? this.backgroundColor
                : this.initialBackgroundColor,
        );

        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'borderStyle',
            this.isInitialState ? 'solid' : this.initialBorderStyle,
        );

        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'borderWidth',
            this.isInitialState ? this.borderWidth : this.initialBorderWidth,
        );

        this.renderer.setStyle(
            this.elementRef.nativeElement,
            'borderColor',
            this.isInitialState ? this.borderColor : this.initialBorderColor,
        );
    }
}
