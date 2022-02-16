import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, share, tap } from 'rxjs/operators';
import { formatDirection, isHorizontal } from 'layout/utils';

@Injectable({
  providedIn: 'root',
})
export class SidebarService {
  private panStart = new Subject<any>();

  private panMove = new Subject<any>();

  private panEnd = new Subject<any>();

  private toggle = new Subject<any>();

  onPanStart(event: any): void {
    this.panStart.next(event);
  }

  onPanMove(event: any): void {
    this.panMove.next(event);
  }

  onPanEnd(event): void {
    this.panEnd.next(event);
  }

  toggleSidebar(): void {
    this.toggle.next({});
  }

  get panStart$(): Observable<any> {
    return this.panStart.asObservable().pipe(
      // Format direction to legible string
      tap((start) => (start.direction = formatDirection(start.direction))),
      // Allow multiple subscriptions
      share(),
    );
  }

  get panHorizontal$(): Observable<any> {
    return this.panMove.asObservable().pipe(
      // Format direction to legible string
      tap((move) => (move.direction = formatDirection(move.direction))),
      // Filter all panning motions that are horizontal
      filter(({ direction }) => isHorizontal(direction)),
      // Allow multiple subscriptions
      // share(),
    );
  }

  get panEnd$(): Observable<any> {
    return this.panEnd.asObservable().pipe(
      // Format direction to legible string
      tap((end) => (end.direction = formatDirection(end.direction))),
      // Allow multiple subscriptions
      share(),
    );
  }

  get toggle$(): Observable<any> {
    return this.toggle.asObservable();
  }
}
