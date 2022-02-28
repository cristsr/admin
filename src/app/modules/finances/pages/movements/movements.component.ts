import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovementDetailComponent } from './detail/movement-detail.component';
import { ActivatedRoute } from '@angular/router';
import { GroupMovement, Movement, MovementQuery } from 'modules/finances/types';
import { MovementService } from 'modules/finances/services';
import { Pageable } from 'core/types';

@Component({
  selector: 'app-movements',
  templateUrl: 'movements.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovementsComponent implements OnInit {
  activeScroll = false;
  completedScroll = false;
  movements: GroupMovement[] = [];
  queryParams: MovementQuery = {
    page: 1,
    perPage: 5,
  };

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private movementService: MovementService,
  ) {}

  ngOnInit(): void {
    this.movementService
      .groupBy()
      .pipe()
      .subscribe((response: Pageable<GroupMovement>) => {
        this.movements.push(...response.data);
        this.activeScroll = true;

        if (response.lastPage) {
          this.completedScroll = true;
        }

        this.changeDetectorRef.detectChanges();
        console.log(this.movements);
      });

    this.movementService.nextPage(this.queryParams);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MovementDetailComponent, {
      data: {
        hello: 'world',
      },
    });

    dialogRef.afterOpened().subscribe((result) => {
      console.log('openDialog', result);
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  scrolled(): void {
    this.queryParams.page++;

    this.activeScroll = false;

    this.movementService.nextPage(this.queryParams);

    console.log('scrolled');
  }

  trackByFn(index: number, item: Movement): string | number {
    return item.id || index;
  }
}
