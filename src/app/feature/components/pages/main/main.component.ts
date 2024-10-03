import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {interval, Subscription, take} from "rxjs";
import {inject} from '@angular/core';
import {SessionStorageService} from '../../../../services/session-storage.service';

declare var $: any;

@Component({
  selector: 'main-component',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})

export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('myModal', {static: true}) private modalElement!: TemplateRef<HTMLElement>;
  private modalService = inject(NgbModal);
  popupTimeoutSubscription: Subscription | null = null;

  constructor(private sessionStorage: SessionStorageService) {
  }

  ngOnInit() {
    $("#accordion").accordion({
      collapsible: true,
    });

    if (this.sessionStorage.getViewPopupState()) {
      this.popupTimeoutSubscription = interval(5000).pipe(take(1)).subscribe(() => {
        this.modalService.open(this.modalElement);
      });
    }
  }

  ngOnDestroy() {
    this.modalService.dismissAll();
    this.sessionStorage.setViewPopupState(false);
    this.popupTimeoutSubscription?.unsubscribe();
  }
}
