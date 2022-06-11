import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { EventEmitterService } from 'core/services';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-loader',
  template: `
    <div
      *ngIf="show"
      class="absolute top-0 left-0 right-0 bottom-0 bg-gray-500 z-[9999] opacity-80 flex items-center justify-center"
    >
      <span class="loader"></span>
    </div>
  `,
  styleUrls: ['./loader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent implements OnInit {
  show = false;

  constructor(
    private cd: ChangeDetectorRef,
    private emitter: EventEmitterService,
  ) {}

  ngOnInit(): void {
    console.log('[LoaderComponent] ngOnInit');

    this.emitter
      .on('loader:show')
      .pipe(distinctUntilChanged())
      .subscribe((show: boolean) => {
        console.log('[LoaderComponent] loader:show', show);
        this.show = show;
        this.cd.detectChanges();
      });
  }
}