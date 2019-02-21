import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  template: `<div [froalaEditor]="config" class="message-content" [ngModel]="message" (ngModelChange)="message = $event">{{ message }}</div>`,
  styles: [`
    .ng-valid {
      margin-top: 10px !important;
      padding: 10px !important;
      border: none !important;
    }
  `]
})
export class TextEditorComponent {
  messageText = '';

  @Input()
  get message() {
    return this.messageText;
  }

  set message(val) {
    this.messageText = val;
    this.messageChange.emit(this.messageText);
  }

  @Output()
  messageChange = new EventEmitter<string>();

  config = {
    charCounterCount: false,
    theme: 'dark',
    placeholderText: '',
    heightMin: 180,
    quickInsertTags: [],
    fontFamily: {
      'Raleway,sans-serif': 'Raleway',
      'Roboto,sans-serif': 'Roboto',
      'Oswald,sans-serif': 'Oswald',
      'Montserrat,sans-serif': 'Montserrat'
    },
    fontFamilySelection: true,
    toolbarButtons: ['fontFamily', '|', 'fontSize', '|', 'color', '|', 'bold', 'italic', 'underline', 'subscript', 'superscript', 'outdent', 'indent', 'strikeThrough', '|', 'paragraphFormat', 'align', 'undo', 'redo'],
    toolbarButtonsXS: ['fontFamily', '|', 'fontSize', '|', 'color', '|', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'paragraphFormat', 'align', 'undo', 'redo'],
    toolbarButtonsSM: ['fontFamily', '|', 'fontSize', '|', 'color', '|', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'paragraphFormat', 'align', 'undo', 'redo'],
    toolbarButtonsMD: ['fontFamily', '|', 'fontSize', '|', 'color', '|', 'bold', 'italic', 'underline', 'strikeThrough', '|', 'paragraphFormat', 'align', 'undo', 'redo'],
  };
}
