import {
    SelectedSkill,
    Certification,
    Status
} from './index';

export interface ConsultantSearch {
    id: string;
    urlProfileImage: string;
    firstName: string;
    lastName: string;
    secondName?: string;
    title: string;
    practice: string;
    status?: Status;
    certifications: Certification[];
    coreSkills: SelectedSkill[];
    technicalSkills: SelectedSkill[];
}
