import {
  Directive,
  ElementRef,
  Renderer2,
  HostListener,
  Input,
} from '@angular/core';
import { Address } from './interfaces';

@Directive({
  selector: '[tooltip_d]',
})
export class TooltipDirective {
  @Input('tooltip_d') address: Address = {
    city: '',
    state: '',
    streetAddress: '',
    zip: '',
  };

  constructor(private el: ElementRef, private r: Renderer2) {}

  @HostListener('mouseenter') onEnter() {
    const divElement = this.r.createElement('div');
    this.r.addClass(divElement, 'tooltip');

    Object.keys(this.address).forEach((key) => {
      let p = this.r.createElement('p');
      this.r.appendChild(p, this.r.createText(`${key}: ${this.address[key]}`));
      this.r.appendChild(divElement, p);
    });

    this.r.appendChild(this.el.nativeElement, divElement);

    const moveHandler = this.r.listen(
      this.el.nativeElement,
      'mousemove',
      (event: any) => {
        this.r.setStyle(divElement, 'top', `${event.pageY + 5}px`);
        this.r.setStyle(divElement, 'left', `${event.pageX + 5}px`);
      }
    );

    const leaveHandler = this.r.listen(
      this.el.nativeElement,
      'mouseleave',
      () => {
        this.r.removeChild(this.el.nativeElement, divElement);
        moveHandler();
        leaveHandler();
      }
    );
  }
}
