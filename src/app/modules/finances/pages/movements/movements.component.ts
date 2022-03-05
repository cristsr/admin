import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import {
  GroupBy,
  GroupMovement,
  Movement,
  MovementQuery,
} from 'modules/finances/types';
import { MovementService } from 'modules/finances/services';
import { Pageable } from 'core/types';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MovementFormComponent } from 'modules/finances/pages/movement-form/movement-form.component';

@Component({
  selector: 'app-movements',
  templateUrl: 'movements.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovementsComponent implements OnInit {
  activeScroll: boolean;
  completedScroll: boolean;
  movements: GroupMovement[];

  queryParams: MovementQuery;

  set groupBy(value: GroupBy) {
    if (this.queryParams.groupBy === value) {
      return;
    }

    this.setInitialConfig(value);
    this.movementService.nextPage(this.queryParams);
  }

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private movementService: MovementService,
    private bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {
    this.movementService.movements$.subscribe({
      next: (response: Pageable<GroupMovement>) => {
        this.movements.push(...response.data);
        this.activeScroll = true;

        if (response.lastPage) {
          this.completedScroll = true;
        }

        this.changeDetectorRef.detectChanges();
        console.log(this.movements);
      },
    });

    this.setInitialConfig();
    this.movementService.nextPage(this.queryParams);
  }

  setInitialConfig(groupBy: GroupBy = 'days'): void {
    this.movements = [];
    this.activeScroll = false;
    this.completedScroll = false;
    this.queryParams = {
      page: 1,
      perPage: 5,
      groupBy,
    };
  }

  showMovementDetail(movement: Movement): void {
    this.bottomSheet.open(MovementFormComponent, {
      data: {
        action: 'read',
        movement,
      },
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
