import { SelectedSkill } from '@feature/consultant/models';

export function filterAndSortDisplaySkills(skills: SelectedSkill[]): SelectedSkill[] {
    return skills.filter(skill => skill.display === true).sort((a, b) => a.displayOrder - b.displayOrder);
}