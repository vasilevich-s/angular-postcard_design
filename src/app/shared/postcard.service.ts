import { Block, DocInfo } from './interfaces';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PostcardService {
  documentInfo: DocInfo = { docName: '', id: '' };
  contentBlocks: Block[] = [];
  stylesPostcard = { backgroundColor: '#ffffff' };
  savedDocuments: any[] = [];

  getBlockById(id: string) {
    return this.contentBlocks.find((item) => item.id === id);
  }

  setStylesPostcard(styles: any) {
    this.stylesPostcard = { ...this.stylesPostcard, ...styles };
  }

  setDocInfo(item: any) {
    this.documentInfo = { docName: item.docName, id: item.id };
    this.contentBlocks = JSON.parse(JSON.stringify(item.stylesBlocks));
    this.setStylesPostcard(item.stylesPostcard);
  }

  addContentBlock(block: Block) {
    this.contentBlocks.push(block);
  }

  resetStyles() {
    this.contentBlocks = [];
    this.stylesPostcard = { backgroundColor: '#ffffff' };
    this.documentInfo = { docName: '', id: '' };
  }

  changeStyleBlock(id: string, styleName: string, value: string) {
    const { styles }: any = this.getBlockById(id);

    if (styles) {
      styles[styleName] = styles[styleName] !== value ? value : '';
    }
  }

  changeText(id: string, value: string) {
    const block = this.getBlockById(id);

    if (block) block.text = value;
  }

  onSave(docName: string) {
    const docInfo = { id: Date.now().toString(), docName };
    const newDoc = {
      ...docInfo,
      stylesPostcard: this.stylesPostcard,
      stylesBlocks: this.contentBlocks,
    };

    localStorage.setItem(
      'docs',
      JSON.stringify(this.savedDocuments.concat(newDoc))
    );
    this.savedDocuments.push(newDoc);
    this.documentInfo = docInfo;
  }

  editDocument(id: string) {
    let idx = this.savedDocuments.findIndex((item) => item.id === id);

    this.savedDocuments[idx] = {
      ...this.savedDocuments[idx],
      stylesPostcard: this.stylesPostcard,
      stylesBlocks: this.contentBlocks,
    };

    localStorage.setItem('docs', JSON.stringify(this.savedDocuments));
  }

  loadDocs() {
    const docs = localStorage.getItem('docs');
    this.savedDocuments = JSON.parse(docs || '[]');
  }
}
