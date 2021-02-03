import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { EditDirective } from './shared/edit.directive';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { UsersComponent } from './users/users.component';
import { FilterPipe } from './shared/filter.pipe';
import { TooltipDirective } from './shared/tooltip.directive';
import { PostcardComponent } from './postcard/postcard.component';
import { OptionsComponent } from './postcard/options/options.component';
import { WorkspaceComponent } from './postcard/workspace/workspace.component';
import { ContentBlockComponent } from './postcard/workspace/content-block/content-block.component';
import { ToolbarComponent } from './postcard/workspace/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    FilterPipe,
    TooltipDirective,
    EditDirective,
    PostcardComponent,
    OptionsComponent,
    WorkspaceComponent,
    ContentBlockComponent,
    ToolbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
