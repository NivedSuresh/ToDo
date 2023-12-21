import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appStatus]',
  standalone: true
})
export class StatusDirective implements OnChanges{
  constructor(
    private element :ElementRef,
    private renderer :Renderer2
  ){}
  
  @Input('appStatus') appStatus! :{completed :boolean, dueDate :Date};

  ngOnChanges(changes: SimpleChanges): void {
    this.renderer.setStyle(this.element.nativeElement, 
      'background-color', 
      this.appStatus.completed ? 'green' : 
      (this.appStatus.dueDate < new Date() && !this.appStatus.completed) ? '#e34f4f' 
      : ''
  );
  }
}
