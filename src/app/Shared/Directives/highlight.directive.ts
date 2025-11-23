import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.changeStyle('scale(1.05)', '2px solid gold', '0 15px 30px rgba(0,0,0,0.3)');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.changeStyle('scale(1)', 'none', '0 8px 16px rgba(0,0,0,0.1)');
  }

  private changeStyle(transform: string, border: string, shadow: string) {
    this.renderer.setStyle(this.el.nativeElement, 'transform', transform);
    this.renderer.setStyle(this.el.nativeElement, 'border', border);
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', shadow);
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'all 0.3s ease');
  }
}
