import { SelectedSkill } from '@core/models';

export function filterSortDisplaySkills(skills: SelectedSkill[]): SelectedSkill[] {
    return skills.filter(skill => skill.display === true).sort((a, b) => a.displayOrder - b.displayOrder);
}