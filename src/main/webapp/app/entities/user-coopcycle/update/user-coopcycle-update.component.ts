import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UserCoopcycleFormService, UserCoopcycleFormGroup } from './user-coopcycle-form.service';
import { IUserCoopcycle } from '../user-coopcycle.model';
import { UserCoopcycleService } from '../service/user-coopcycle.service';
import { IMember } from 'app/entities/member/member.model';
import { MemberService } from 'app/entities/member/service/member.service';

@Component({
  selector: 'jhi-user-coopcycle-update',
  templateUrl: './user-coopcycle-update.component.html',
})
export class UserCoopcycleUpdateComponent implements OnInit {
  isSaving = false;
  userCoopcycle: IUserCoopcycle | null = null;

  membersSharedCollection: IMember[] = [];

  editForm: UserCoopcycleFormGroup = this.userCoopcycleFormService.createUserCoopcycleFormGroup();

  constructor(
    protected userCoopcycleService: UserCoopcycleService,
    protected userCoopcycleFormService: UserCoopcycleFormService,
    protected memberService: MemberService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareMember = (o1: IMember | null, o2: IMember | null): boolean => this.memberService.compareMember(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ userCoopcycle }) => {
      this.userCoopcycle = userCoopcycle;
      if (userCoopcycle) {
        this.updateForm(userCoopcycle);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const userCoopcycle = this.userCoopcycleFormService.getUserCoopcycle(this.editForm);
    if (userCoopcycle.id !== null) {
      this.subscribeToSaveResponse(this.userCoopcycleService.update(userCoopcycle));
    } else {
      this.subscribeToSaveResponse(this.userCoopcycleService.create(userCoopcycle));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUserCoopcycle>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(userCoopcycle: IUserCoopcycle): void {
    this.userCoopcycle = userCoopcycle;
    this.userCoopcycleFormService.resetForm(this.editForm, userCoopcycle);

    this.membersSharedCollection = this.memberService.addMemberToCollectionIfMissing<IMember>(
      this.membersSharedCollection,
      userCoopcycle.member
    );
  }

  protected loadRelationshipsOptions(): void {
    this.memberService
      .query()
      .pipe(map((res: HttpResponse<IMember[]>) => res.body ?? []))
      .pipe(map((members: IMember[]) => this.memberService.addMemberToCollectionIfMissing<IMember>(members, this.userCoopcycle?.member)))
      .subscribe((members: IMember[]) => (this.membersSharedCollection = members));
  }
}
