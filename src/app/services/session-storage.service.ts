import {Inject, Injectable} from '@angular/core';
import {DOCUMENT} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private window: Window | null;
  constructor(@Inject(DOCUMENT) private document: Document) {
    this.window = this.document.defaultView;
    this.setViewPopupState(true);
  }

  setViewPopupState(viewPopup: boolean): void {
    this.window?.sessionStorage.setItem('viewPopup', JSON.stringify(viewPopup));
  }

  getViewPopupState(): boolean {
    const view = this.window?.sessionStorage.getItem('viewPopup');
    return !!view;
  }
}
