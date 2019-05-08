import { Injectable } from '@angular/core';
import { CoreSkillsService } from '../core-skills-data/core-skills-data.service';
import { TechnicalSkillsService } from '../technical-skills-data/technical-skills-data.service';
import { SkillType, Skill, SKILL_CORE } from '@core/models';
import { Observable } from 'rxjs';
import { ConsultantServiceModule } from '@feature/consultant/consultant-service.module';

@Injectable({
  providedIn: ConsultantServiceModule
})
export class SkillsDataService {

  constructor(
    private coreSkillsService: CoreSkillsService,
    private technicalSkillsService: TechnicalSkillsService
  ) { }

  coreSkills$ = this.coreSkillsService.getCoreSkills();
  technicalSkills$ = this.technicalSkillsService.getTechnicalSkills();

  addNewSkill(skillName: string, skillType: SkillType): Observable<Skill> {
    const skill: Skill = {
      id: null,
      name: skillName,
      type: skillType
    };

    return skillType === SKILL_CORE
      ? this.coreSkillsService.createCoreSkill(skill)
      : this.technicalSkillsService.createTechnicalSkill(skill);
  }

}
