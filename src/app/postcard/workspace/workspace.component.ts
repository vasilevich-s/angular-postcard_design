import { animate, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output, OnDestroy } from '@angular/core';
import { Icon, Block } from './../../shared/interfaces';
import { PostcardService } from './../../shared/postcard.service';
import icons from '../../shared/iconsFormat';

@Component({
  selector: 'app-workspace',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.scss'],
  animations: [
    trigger('workspace', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate(500, style({ opacity: 1 })),
      ]),
    ]),
  ],
})
export class WorkspaceComponent implements OnDestroy {
  @Output() back = new EventEmitter();

  selectIdBlock = '';
  colorText = '';
  icons: Array<Icon> = icons();

  constructor(public postcardService: PostcardService) {}

  ngOnDestroy() {
    this.save();
  }

  save() {
    const id = this.postcardService.documentInfo.id;
    const text = id ? 'Сохранить изменения?' : 'Сохранить документ?';

    const isSave = confirm(text);

    if (isSave) {
      if (!id) {
        const docName =
          prompt('Введите название') ||
          'Document' + (this.postcardService.savedDocuments.length + 1);
        this.postcardService.onSave(docName);
      } else {
        this.postcardService.editDocument(id);
      }
    }

    this.postcardService.resetStyles();
  }

  isTextAlignIcon(value: string) {
    return ['left', 'center', 'right'].includes(value);
  }

  selectIcons(style: string, value: string) {
    if (style === 'color') {
      this.colorText = value;
    } else {
      const icon = this.icons.find((item) => item.title === value);

      if (icon) {
        if (this.isTextAlignIcon(value)) {
          this.icons.forEach((item: any) => {
            if (this.isTextAlignIcon(item.title)) item.selected = false;
          });
        }
        icon.selected = !icon.selected;
      }
    }
  }

  changeStyle({ style, value }: any) {
    if (this.selectIdBlock) {
      this.selectIcons(style, value);
      this.postcardService.changeStyleBlock(this.selectIdBlock, style, value);
    }
  }

  addBlock(block: Block) {
    this.postcardService.addContentBlock(block);
    this.selectIdBlock = block.id;
    this.dblclickBlock(block.id);
  }

  blurBlock() {
    this.icons = this.icons.map((item) => {
      item.selected = false;
      return item;
    });
    this.colorText = '#000000';
    this.selectIdBlock = '';
  }

  dblclickBlock(id: string) {
    const { styles }: any = this.postcardService.getBlockById(id);

    if (styles) {
      this.selectIdBlock = id;
      this.colorText = styles.color;

      this.icons = this.icons.map((item: Icon) => {
        if (item.title === styles[item.styleName]) {
          item.selected = true;
        } else {
          item.selected = false;
        }

        return item;
      });
    }
  }
}
