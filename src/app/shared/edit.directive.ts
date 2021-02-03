import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appEdit]',
})
export class EditDirective {
  constructor(private el: ElementRef, private r: Renderer2) {}

  @HostListener('mousedown', ['$event']) onMousedown(event: MouseEvent) {
    let beginX = event.pageX;
    let blockLeft = this.el.nativeElement.offsetLeft;

    const moveHandler = this.r.listen(
      this.el.nativeElement,
      'mousemove',
      (e: MouseEvent) => {
        console.log();
        this.r.setStyle(
          this.el.nativeElement,
          'marginLeft',
          `${e.pageX - beginX + blockLeft}px`
        );
      }
    );

    const mouseupHandler = this.r.listen(
      this.el.nativeElement,
      'mouseup',
      () => {
        moveHandler();
        mouseupHandler();
      }
    );
  }
}
