import { Skill } from './skill';

export interface SelectedSkill extends Skill {
    display: boolean;
    displayOrder: number | null;
}