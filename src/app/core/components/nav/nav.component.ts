import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar/sidebar.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(private sidebarService: SidebarService) { }

  public ngOnInit(): void {
  }

  public onToggleSideMenu(): void {
    this.sidebarService.expandOrCollapseMenu();
  }
}
