import { Component, ChangeDetectionStrategy, OnDestroy, ElementRef, ViewChild, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

import { tap, switchMap, map, startWith, takeUntil, mergeMap, filter } from 'rxjs/operators';
import { Subject, forkJoin, Observable, of, BehaviorSubject } from 'rxjs';

import { MatAutocompleteSelectedEvent, MatChipInputEvent, MatAutocomplete, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Skill } from '@core/models';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { ConsultantSkillDataService } from '@feature/consultant/services/consultant-skill-data/consultant-skill-data.service';

import { cloneDeep, isEqual, intersectionWith, differenceWith } from 'lodash';

export interface SkillOption extends Skill {
    selected: boolean;
}

export interface SkillsEditDialogData {
    type: SkillsType
}

export type SkillsType = 'coreSkills' | 'technicalSkills';

@Component({
    selector: 'app-consultant-skills-edit',
    templateUrl: './consultant-skills-edit.component.html',
    styleUrls: ['./consultant-skills-edit.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantSkillsEditComponent implements OnInit, OnDestroy {
    @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
    @ViewChild('auto') matAutocomplete: MatAutocomplete;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: SkillsEditDialogData,
        private consultantStore: ConsultantStore,
        private consultantSkillService: ConsultantSkillDataService,
        private dialogRef: MatDialogRef<ConsultantSkillsEditComponent>,
    ) { }

    skillType: SkillsType = this.data.type;
    separatorKeysCodes: number[] = [ENTER, COMMA];
    skillCtrl = new FormControl();

    destroy$ = new Subject();
    consultant$ = 
        this.consultantStore.consultant$
            .pipe(
                tap(c => this._selectedSkills$ = new BehaviorSubject(c[this.skillType]))
            );

    getSkills$ = 
        this.skillType === 'coreSkills'
            ? this.consultantSkillService.getCoreSkills().pipe(takeUntil(this.destroy$))
            : this.consultantSkillService.getTechnicalSkills().pipe(takeUntil(this.destroy$))

    private _selectedSkills$: BehaviorSubject<Skill[]>;
    selectedSkills$ = this._selectedSkills$.asObservable();
    selectedSkills: Skill[] = this._selectedSkills$.value;

    availableSkills$: Observable<SkillOption[]> = 
        forkJoin(this.selectedSkills$, this.getSkills$)
            .pipe(
                map(([selectedSkills, availableSkills]) => {
                    return this.buildAvailableSkillsOptions(selectedSkills, availableSkills);
                })
            )
    


    private buildAvailableSkillsOptions(selectedSkills: Skill[], availableSkills: Skill[]) {
        const selectedSkillsOptions = selectedSkills.map(skill => {
            const selectedSkill: SkillOption = {
                ...cloneDeep(skill),
                selected: true
            };
            return selectedSkill;
        });
        const unselectedSkills: Skill[] = differenceWith(availableSkills, selectedSkills, isEqual);
        const unselectedSkillsOptions = unselectedSkills.map(skill => {
            const selectedSkill: SkillOption = {
                ...cloneDeep(skill),
                selected: false
            };
            return selectedSkill;
        });
        const availableSkillsOptions: SkillOption[] = [
            ...selectedSkillsOptions,
            ...unselectedSkillsOptions
        ];
        return availableSkillsOptions;
    }

    ngOnInit() {
        this.getSkills$.subscribe();
    }

    ngOnDestroy() {
        this.destroy$.next();
    }
}
