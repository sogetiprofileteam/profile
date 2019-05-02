import { TechnicalSkillsService } from './technical-skills/technical-skills.service';
import { CoreSkillsService } from './core-skills/core-skills.service';
import { ConsultantService } from './consultant/consultant.service';

export * from './technical-skills/technical-skills.service';
export * from './core-skills/core-skills.service';
export * from './consultant/consultant.service';

export const Services = [
    TechnicalSkillsService,
    CoreSkillsService,
    ConsultantService
];
