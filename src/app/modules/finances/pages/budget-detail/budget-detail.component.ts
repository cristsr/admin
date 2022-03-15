import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Budget, GroupMovement, Movement } from 'modules/finances/types';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
// TODO short import
import { MovementFormComponent } from 'modules/finances/components/movement-form/movement-form.component';

@Component({
  selector: 'app-budget-detail',
  templateUrl: './budget-detail.component.html',
  styleUrls: ['./budget-detail.component.scss'],
})
export class BudgetDetailComponent implements OnInit {
  budget: Budget;
  movements: GroupMovement[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private bottomSheet: MatBottomSheet,
  ) {}

  ngOnInit(): void {
    const { budget, movements } = this.activatedRoute.snapshot.data.data;
    this.budget = budget;
    this.movements = movements;

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
