import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private panMove = new Subject();

  private panEnd = new Subject();
  private panLeft = new Subject();

  private toggle = new Subject();

  constructor() { }

  onPanRight(event): void {
    this.panMove.next(event);
  }

  onPanEnd(event): void {
    this.panEnd.next(event);
  }


  onPanLeft(event: any): void {
    this.panLeft.next(event);
  }

  toggleSidebar(): void {
    this.toggle.next();
  }

  get panRight$(): Observable<any> {
    return this.panMove.asObservable();
  }

  get panLeft$(): Observable<any> {
    return this.panLeft.asObservable();
  }

  get panEnd$(): Observable<any> {
    return this.panEnd.asObservable();
  }



  get toggle$(): Observable<any> {
    return this.toggle.asObservable();
  }

}
