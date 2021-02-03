import {
  Component,
  EventEmitter,
  Input,
  Output,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';

import { PostcardService } from './../../../shared/postcard.service';

@Component({
  selector: 'app-content-block',
  templateUrl: './content-block.component.html',
  styleUrls: ['./content-block.component.scss'],
})
export class ContentBlockComponent implements AfterViewInit {
  @Input() block: any;
  @Input() select: boolean = false;
  @Output() dblClick = new EventEmitter();
  @ViewChild('blockRef') blockRef: any;

  constructor(private service: PostcardService) {}

  ngAfterViewInit() {
    this.isFocusBlock();
  }

  isFocusBlock() {
    if (this.select) {
      this.blockRef.nativeElement.focus();
    }
  }

  dblClickHandler() {
    this.blockRef.nativeElement.focus();
    this.dblClick.emit(this.block.id);
  }

  blurHandler() {
    this.service.changeText(
      this.block.id,
      this.blockRef.nativeElement.textContent
    );
  }
}
