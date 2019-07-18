import {
    Address,
    SelectedSkill,
    Education,
    Experience,
    Certification,
    Status
} from './index';

export interface Consultant {
    id: string;
    urlProfileImage: string;
    firstName: string;
    lastName: string;
    secondName?: string;
    title: string;
    practice: string;
    status?: string;
    email: string;
    address: Address;
    phone: number;
    summary: string;
    urlLinkedIn?: string;
    urlGitHub?: string;
    urlWordpress?: string;
    urlPersonal?: string;
    certifications: Certification[];
    coreSkills: SelectedSkill[];
    technicalSkills: SelectedSkill[];
    education: Education[];
    experience: Experience[];
}
