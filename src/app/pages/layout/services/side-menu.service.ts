import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideMenuService {
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
    const result = this.subMenuItemsExpanded.find(v => v === index);

    // si esta oculto y se requiere expandir
    if (!result) {
      this.subMenuItemsExpanded.push(index);
      this.isExpandedMenu.next(true);
    }

    // si el submenu esta expandido y el menu esta colapsado
    if (result && !this.isExpandedMenu.value) {
      this.isExpandedMenu.next(true);
      return;
    }

    // si se encuentra expandido y se requiere ocultar
    if (result) {
      this.subMenuItemsExpanded = this.subMenuItemsExpanded.filter(v => v !== index);
    }
  }

  public canShowSubmenu(index: number): boolean {
    return !!this.subMenuItemsExpanded.find(v => v === index);
  }
}
