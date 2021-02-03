import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { PostcardService } from './../../../shared/postcard.service';
import { Icon, Styles } from './../../../shared/interfaces';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  @Input() icons: Icon[] = [];
  @Input() colorText = '';
  @Output() change = new EventEmitter();
  @Output() addBlock = new EventEmitter();
  @ViewChild('color_text') color_text: any;

  defaultStylesBlock: Styles = {
    fontSize: '24px',
    textAlign: 'center',
    fontWeight: '',
    fontStyle: '',
    textDecoration: '',
    color: '#000000',
  };

  constructor(public postcardService: PostcardService) {}

  add(type: 'head' | 'text') {
    const id = Date.now().toString();
    if (type === 'text') {
      this.defaultStylesBlock = {
        ...this.defaultStylesBlock,
        fontSize: '16px',
        textAlign: 'left',
        minHeight: '40px',
      };
    }

    this.addBlock.emit({
      id,
      text: '',
      type,
      styles: this.defaultStylesBlock,
    });
  }
}
