import { Component, OnInit } from '@angular/core';

import { PostcardService } from './../shared/postcard.service';
import { OptionsPostcard } from './../shared/interfaces';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss'],
})
export class PostcardComponent implements OnInit {
  optionsVisible = false;
  workspaceVisible = false;

  constructor(public postcardService: PostcardService) {}

  ngOnInit(): void {
    this.postcardService.loadDocs();
  }

  createNewPostcard(values: OptionsPostcard) {
    const size = values.size.split('x');
    this.postcardService.setStylesPostcard({
      width: size[0] + 'px',
      height: size[1] + 'px',
      backgroundImage: `url(assets/borders/${values.background})`,
    });
    this.workspaceVisible = true;
  }

  loadDocument(item: any) {
    this.workspaceVisible = true;
    this.postcardService.setDocInfo(item);
  }
}
