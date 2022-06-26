import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { distinctUntilChanged, Subscription } from 'rxjs';
import { EventEmitterService } from 'core/services';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, MatProgressBarModule],
  template: `
    <div class="fixed w-full" *ngIf="show">
      <mat-progress-bar mode="indeterminate"></mat-progress-bar>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit, OnDestroy {
  show = false;
  #subscription: Subscription;

  constructor(
    private cd: ChangeDetectorRef,
    private emitter: EventEmitterService,
  ) {}

  ngOnInit(): void {
    this.#subscription = this.emitter
      .on('loader:show')
      .pipe(distinctUntilChanged())
      .subscribe((show: boolean) => {
        this.show = show;
        this.cd.detectChanges();
      });
  }

  ngOnDestroy() {
    this.#subscription.unsubscribe();
  }
}
