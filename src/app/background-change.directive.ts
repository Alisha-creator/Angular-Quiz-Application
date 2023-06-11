import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBackgroundChange]'
})
export class BackgroundChangeDirective {

  @Input()isCorrect : Boolean = false;
  constructor(private elementReference : ElementRef, private renderer : Renderer2) { }
  @HostListener('click') answer(){
    if(this.isCorrect){
      this.renderer.setStyle(this.elementReference.nativeElement,'background','darkgreen');
      this.renderer.setStyle(this.elementReference.nativeElement,'color','#fff');
      this.renderer.setStyle(this.elementReference.nativeElement,'border','2px solid grey');
    }
    else{
      this.renderer.setStyle(this.elementReference.nativeElement,'background','red');
      this.renderer.setStyle(this.elementReference.nativeElement,'color','#fff');
      this.renderer.setStyle(this.elementReference.nativeElement,'border','2px solid grey');
    }
  }

}
