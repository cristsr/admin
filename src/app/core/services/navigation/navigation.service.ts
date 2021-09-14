import { Injectable } from '@angular/core';
import { fromEvent } from 'rxjs';
import { debounceTime, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  /**
   * Determinate if device is mobile or desktop
   */
  isMobile = window.innerWidth < 640;

  /**
   * Hide sidebar by default if is mobile
   * or show if is desktop
   */
  showSidebar = !this.isMobile;

  constructor() { }

  listenWindowResize(): void {
    const stream = fromEvent(window, 'resize').pipe(
      debounceTime(50),
      pluck<Event, number>('target', 'innerWidth')
    );

    stream.subscribe((width: number) => {
      if (width < 640 && !this.isMobile) {
        this.isMobile = true;
        this.showSidebar = false;
        return;
      }

      if (width >= 640 && this.isMobile) {
        this.isMobile = false;
        this.showSidebar = true;
      }
    });
  }

  toggleSidebar(): void {
    this.showSidebar = !this.showSidebar;
  }
}
