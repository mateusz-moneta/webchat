import { Injectable, Inject } from '@angular/core';
import { WINDOW } from '../providers/window.provider';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(
    @Inject(WINDOW) private window: Window,
    @Inject(DOCUMENT) private document: any) { }

  get height(): number {
    const body = this.document.body,
    html = this.document.documentElement,
    height = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);

    return height;
  }

  posY(posY: number) {
    this.window.scroll(0, posY);
  }

  toPosY(posY: number): void {
    try {
      this.window.scrollTo({ left: 0, top: posY, behavior: 'smooth' });
    } catch (e) {
      this.window.scrollTo(0, posY);
    }
  }
}
