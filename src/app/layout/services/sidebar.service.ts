import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private initialDirection = new Subject<number>();

  private panHorizontal = new Subject<HammerInput>();

  private panEnd = new Subject<HammerInput>();

  private toggle = new Subject();

  constructor() { }

  setInitialDirection(direction: number): void {
    this.initialDirection.next(direction);
  }

  onPanEnd(event): void {
    this.panEnd.next(event);
  }

  onPanHorizontal(event: HammerInput): void {
    this.panHorizontal.next(event);
  }

  toggleSidebar(): void {
    this.toggle.next();
  }

  get panHorizontalStream(): Observable<HammerInput> {
    return this.panHorizontal.asObservable();
  }

  get panEndStream(): Observable<HammerInput> {
    return this.panEnd.asObservable();
  }

  get initialDirectionStream(): Observable<number> {
    return this.initialDirection.asObservable();
  }

  get toggle$(): Observable<any> {
    return this.toggle.asObservable();
  }

}
