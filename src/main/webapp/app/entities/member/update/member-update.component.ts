import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { MemberFormService, MemberFormGroup } from './member-form.service';
import { IMember } from '../member.model';
import { MemberService } from '../service/member.service';
import { ICooperative } from 'app/entities/cooperative/cooperative.model';
import { CooperativeService } from 'app/entities/cooperative/service/cooperative.service';
import { MemberRole } from 'app/entities/enumerations/member-role.model';

@Component({
  selector: 'jhi-member-update',
  templateUrl: './member-update.component.html',
})
export class MemberUpdateComponent implements OnInit {
  isSaving = false;
  member: IMember | null = null;
  memberRoleValues = Object.keys(MemberRole);

  cooperativesSharedCollection: ICooperative[] = [];

  editForm: MemberFormGroup = this.memberFormService.createMemberFormGroup();

  constructor(
    protected memberService: MemberService,
    protected memberFormService: MemberFormService,
    protected cooperativeService: CooperativeService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareCooperative = (o1: ICooperative | null, o2: ICooperative | null): boolean => this.cooperativeService.compareCooperative(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ member }) => {
      this.member = member;
      if (member) {
        this.updateForm(member);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const member = this.memberFormService.getMember(this.editForm);
    if (member.id !== null) {
      this.subscribeToSaveResponse(this.memberService.update(member));
    } else {
      this.subscribeToSaveResponse(this.memberService.create(member));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMember>>): void {
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

  protected updateForm(member: IMember): void {
    this.member = member;
    this.memberFormService.resetForm(this.editForm, member);

    this.cooperativesSharedCollection = this.cooperativeService.addCooperativeToCollectionIfMissing<ICooperative>(
      this.cooperativesSharedCollection,
      member.cooperativeId
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cooperativeService
      .query()
      .pipe(map((res: HttpResponse<ICooperative[]>) => res.body ?? []))
      .pipe(
        map((cooperatives: ICooperative[]) =>
          this.cooperativeService.addCooperativeToCollectionIfMissing<ICooperative>(cooperatives, this.member?.cooperativeId)
        )
      )
      .subscribe((cooperatives: ICooperative[]) => (this.cooperativesSharedCollection = cooperatives));
  }
}
