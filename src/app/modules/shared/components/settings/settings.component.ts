import { Component, EventEmitter, Output } from '@angular/core';

import { LanguageService } from '@shared/services/language.service';
import { Language } from '@interfaces/language.interface';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss', './settings.responsive.component.scss']
})
export class SettingsComponent {
  @Output()
  close = new EventEmitter<void>();
  languages: Language[] = [];

  private languageIndex: number = 0;

  constructor(private language: LanguageService) {
    this.languages = this.language.languageList;
  }

  valueChange(value: number): void {
    this.languageIndex = value;
  }

  save(): void {
    const currentLanguage = this.language.getCurrentLanguage();
    if (this.languages[this.languageIndex].code !== currentLanguage) {
      this.language.changeLanguage(this.languages[this.languageIndex].code);
      this.close.emit();
    }
  }

  onClose(): void {
    this.close.emit();
  }
}
