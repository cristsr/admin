import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EventEmitterService } from 'core/services';
import { skipWhile, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-alert',
  template: `
    <ng-template #template let-data>
      <div class="text-black">Dialog content</div>
    </ng-template>
  `,
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('template') template: TemplateRef<HTMLDivElement>;
  #unsubscribeAll = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private emitter: EventEmitterService,
  ) {}

  ngOnInit(): void {
    console.log('[AlertComponent] ngOnInit');
  }

  ngAfterViewInit(): void {
    this.emitter
      .on('alert:show')
      .pipe(
        takeUntil(this.#unsubscribeAll),
        skipWhile(() => !this.template),
      )
      .subscribe({
        next: () => {
          this.dialog.open(this.template, {});
        },
      });
  }

  ngOnDestroy(): void {
    this.#unsubscribeAll.next();
    this.#unsubscribeAll.complete();
  }
}
