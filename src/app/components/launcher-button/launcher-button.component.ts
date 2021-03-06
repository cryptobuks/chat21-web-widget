import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Globals } from '../../utils/globals';
import { StorageService } from '../../providers/storage.service';


import { trigger, state, style, animate, transition } from '@angular/animations';
// vedi: https://angular.io/guide/animations

@Component({
  selector: 'tiledeskwidget-launcher-button',
  templateUrl: './launcher-button.component.html',
  styleUrls: ['./launcher-button.component.scss'],
  animations: [
    trigger(
      'enterCloseAnimation', [
        transition(':enter', [
          style({ transform: 'rotate(-90deg)', opacity: 1 }),
          animate('450ms ease-out', style({ transform: 'rotate(0deg)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'scale(1)', opacity: 1 }),
          animate('200ms ease-in', style({ transform: 'scale(0.5)', opacity: 0 }))
        ])
      ]
    ),
    trigger(
      'enterBubbleAnimation', [
        transition(':enter', [
          style({ transform: 'scale(0.5)', opacity: 0 }),
          animate('200ms ease-out', style({ transform: 'scale(1)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'scale(1)', opacity: 1 }),
          animate('200ms ease-in', style({ transform: 'scale(0.5)', opacity: 0 }))
        ])
      ]
    )
  ]
})
export class LauncherButtonComponent implements OnInit {
  @Output() eventOpenCloseWidget = new EventEmitter<boolean>();

  isOpen: boolean;
  constructor(
    public g: Globals,
    public storageService: StorageService
  ) {
  }

  ngOnInit() {
     this.g.wdLog(['open_close_handler BUTTON 1: ', this.g.isOpen]);
  }

  openCloseWidget() {
    if (this.g.isLogged === true) {
      this.g.wdLog(['1 open_close_handler BUTTON: ', this.g.isOpen]);
      // this.g.isOpen = !this.g.isOpen;
      this.g.setIsOpen(!this.g.isOpen);
      this.storageService.setItem('isOpen', this.g.isOpen);
      this.g.wdLog(['2 open_close_handler BUTTON: ', this.g.isOpen]);
      this.eventOpenCloseWidget.emit( this.g.isOpen );
    }
  }

}
