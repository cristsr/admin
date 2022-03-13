import { Component, Inject, OnInit, Optional } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Budget, Movement } from 'modules/finances/types';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MovementFormComponent } from 'modules/finances/pages/movement-form/movement-form.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss'],
})
export class BudgetDetailComponent implements OnInit {
  budget: Budget;
  movements: Movement[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
    @Inject(MAT_DIALOG_DATA) @Optional() public data: any,
  ) {
    this.budget = data?.budget;
    this.movements = data?.movements;
  }

  ngOnInit(): void {
    if (!this.data) {
      const { budget, movements } = this.activatedRoute.snapshot.data.data;

      this.budget = budget;
      this.movements = movements;
    }

    console.log(this.budget, this.movements);
  }

  showMovementDetail(movement: Movement): void {
    this.bottomSheet.open(MovementFormComponent, {
      data: {
        action: 'read',
        movement,
      },
    });
  }

  trackByFn(index: number, item: Movement): string | number {
    return item.id || index;
  }
}
