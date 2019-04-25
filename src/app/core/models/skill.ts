/** Type: 1 = technical, 2 = core */
export interface Skill {
    id: string;
    name: string;
    type: SkillType
}

export const SKILL_TECHNICAL = 1;
export const SKILL_CORE = 2;

export type SkillType = 1 | 2;