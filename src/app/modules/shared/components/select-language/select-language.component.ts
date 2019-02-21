import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { AppFacade } from '../../../../+state/app.facade';
import { LanguageService } from '@shared/services/language.service';
import { Language } from '../../interfaces/language.interface';

@Component({
  selector: 'app-select-language',
  templateUrl: './select-language.component.html',
  styleUrls: ['./select-language.component.scss']
})
export class SelectLanguageComponent implements OnDestroy, OnInit {

  languages: Language[] = [];
  currentLanguageTitle: string;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private language: LanguageService, private appFacade: AppFacade) {
    this.appFacade.loadLanguage();
  }

  changeLanguage(value: string) {
    this.language.changeLanguage(value);
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  ngOnInit(): void {
    this.languages = this.language.languageList;
    this.appFacade.language$.pipe(takeUntil(this.ngUnsubscribe)).subscribe((currentLanguage: string) => {
      this.currentLanguageTitle = this.languages.find(language => language.code === currentLanguage).title;
    });
  }
}
