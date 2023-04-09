import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IUserCoopcycle } from '../user-coopcycle.model';

@Component({
  selector: 'jhi-user-coopcycle-detail',
  templateUrl: './user-coopcycle-detail.component.html',
})
export class UserCoopcycleDetailComponent implements OnInit {
  userCoopcycle: IUserCoopcycle | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userCoopcycle }) => {
      this.userCoopcycle = userCoopcycle;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
