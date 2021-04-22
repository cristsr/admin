import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private isExpandedMenu = new BehaviorSubject(true);
  private subMenuItemsExpanded: Array<number> = [];


  public expandOrCollapseMenu(): void {
    const currentValue = !this.isExpandedMenu.value;
    this.isExpandedMenu.next(currentValue);
  }

  public getExpandedMenu(): Observable<boolean> {
    return this.isExpandedMenu.asObservable();
  }

  public showSubmenu(index: number): void {
    const isExpanded = this.subMenuItemsExpanded.find(v => v === index);

    if (!isExpanded) {
      this.subMenuItemsExpanded.push(index);
      this.isExpandedMenu.next(true);
    }

    if (isExpanded && !this.isExpandedMenu.value) {
      this.isExpandedMenu.next(true);
      return;
    }

    if (isExpanded) {
      this.subMenuItemsExpanded = this.subMenuItemsExpanded.filter(v => v !== index);
    }
  }

  public canShowSubmenu(index: number): boolean {
    return !!this.subMenuItemsExpanded.find(v => v === index);
  }
}
