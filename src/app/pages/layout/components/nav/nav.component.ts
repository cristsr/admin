import { Component, OnInit } from '@angular/core';
import { SideMenuService } from '../../services/side-menu.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private sideMenuService: SideMenuService) { }

  public ngOnInit(): void {
  }

  public onToggleSideMenu(): void {
    this.sideMenuService.expandOrCollapseMenu();
  }
}
