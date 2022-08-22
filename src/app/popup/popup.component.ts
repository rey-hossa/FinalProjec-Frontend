import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {

  @Input() message: any; 

  @Output() onHide = new EventEmitter<boolean>();
    

  constructor() { }

  ngOnInit(): void {
  }

  setHide(){
    this.onHide.emit(false);
  }

}
