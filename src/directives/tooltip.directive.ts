import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[tooltip]',
  standalone: true
})
export class TooltipDirective {
  @Input('tooltip') tooltip: string = '';

  private tooltipElement: HTMLElement | null = null;

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this.createTooltip();
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.destroyTooltip();
  }
  @HostListener('click') onClick() {
    this.destroyTooltip(); // מסיר את ה-tooltip כאשר לוחצים על הכפתור
  }
  private createTooltip() {
   
    console.log(this.tooltip);
    
    this.tooltipElement = document.createElement('span');
    this.tooltipElement.textContent = this.tooltip;
    this.tooltipElement.style.position = 'absolute';
    this.tooltipElement.style.backgroundColor = 'beige'
    this.tooltipElement.style.color = 'white';
    this.tooltipElement.style.padding = '5px';
    this.tooltipElement.style.borderRadius = '5px';
    this.tooltipElement.style.zIndex = '1000';
      
    const rect = this.el.nativeElement.getBoundingClientRect();
    this.tooltipElement.style.left = `${rect.left}px`;
    this.tooltipElement.style.top = `${rect.top + rect.height}px`;

    document.body.appendChild(this.tooltipElement);
    // setTimeout(() => {
    //   this.destroyTooltip();
    // }, 100);
  }

  private destroyTooltip() {
    if (this.tooltipElement) {
      document.body.removeChild(this.tooltipElement);
      this.tooltipElement = null;
    }
  }
}
