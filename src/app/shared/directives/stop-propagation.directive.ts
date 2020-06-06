import { Directive, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[appStopPropagation]',
})
export class StopPropagationDirective {
    @HostListener('click', ['$event'])
    onClick(event: Event) {
        event.stopPropagation();
    }
}
