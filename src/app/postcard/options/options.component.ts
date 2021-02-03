import { Component, EventEmitter, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
  animations: [
    trigger('newCardOptions', [
      state('start', style({ top: '70px' })),
      state('end', style({ right: '0px', left: 'auto' })),
      transition('start => end', [style({ left: 'auto' }), animate('450ms')]),
      transition('void => *', [style({ top: '-200px' }), animate('0.5s')]),
      transition(
        ':leave',
        animate(
          '0.3s',
          style({
            opacity: '0',
            transform: 'scale(1.2) translateX(-50%)',
          })
        )
      ),
    ]),
  ],
})
export class OptionsComponent {
  @Output() hide = new EventEmitter();
  @Output() create = new EventEmitter();

  sizes = ['480x360', '720x480', '1000x600'];
  backgroundImages = [
    'border-1.png',
    'border-2.png',
    'border-3.png',
    'border-4.png',
  ];

  backgroundImage = 'border-1.png';
  sizeValue = '480x360';
  newCardOptionsState = 'start';
  nextStepVisible = false;

  nextStep() {
    this.newCardOptionsState = 'end';
    this.nextStepVisible = true;
  }

  backStep() {
    this.newCardOptionsState = 'start';
    this.nextStepVisible = false;
  }

  createHandler() {
    this.hide.emit();
    this.create.emit({
      size: this.sizeValue,
      background: this.backgroundImage,
    });
  }
}
