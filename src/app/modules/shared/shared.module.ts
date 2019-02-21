import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { SocketIoConfig, SocketIoModule } from 'ng6-socket-io';

import { CustomMaterialModule } from './custom-material.module';
import { httpLoaderFactory } from './utils/httpLoaderFactory';

import { CarouselComponent } from './components/carousel/carousel.component';
import { SelectLanguageComponent } from './components/select-language/select-language.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SingleControlComponent } from './components/single-control/single-control.component';
import { TextEditorComponent } from './components/text-editor/text-editor.component';
import { UsersComponent } from './components/users/users.component';

import { CarouselElementDirective } from './directives/carousel-element.directive';
import { CarouselItemDirective } from './directives/carousel-item.directive';
import { ForbiddenValidatorDirective } from './directives/forbidden-name.directive';

import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { DateTimePipe } from './pipes/datetime.pipe';

import { LanguageService } from './services/language.service';

@NgModule({
  declarations: [
    CarouselComponent,
    SelectLanguageComponent,
    SettingsComponent,
    SingleControlComponent,
    TextEditorComponent,
    UsersComponent,
    CarouselItemDirective,
    CarouselElementDirective,
    ForbiddenValidatorDirective,
    SafeHtmlPipe,
    DateTimePipe
  ],
  imports: [
    CustomMaterialModule,
    CommonModule,
    FormsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FroalaEditorModule,
    FroalaViewModule,
    ReactiveFormsModule
  ],
  exports: [
    CustomMaterialModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    CarouselComponent,
    SelectLanguageComponent,
    SingleControlComponent,
    TextEditorComponent,
    CarouselItemDirective,
    CarouselElementDirective,
    SingleControlComponent,
    ReactiveFormsModule,
    SimpleNotificationsModule,
    SafeHtmlPipe,
    DateTimePipe,
    TranslateModule
  ],
  entryComponents: [
    SettingsComponent,
    UsersComponent
  ],
  providers: [LanguageService]
})
export class SharedModule { }
