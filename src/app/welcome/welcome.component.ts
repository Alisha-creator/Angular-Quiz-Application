import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  @ViewChild('particpant_name') name!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  startQuiz(){
    localStorage.setItem("particpant_name",this.name.nativeElement.value)
  }

}
