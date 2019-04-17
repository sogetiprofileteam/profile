import {
    Address,
    Skill,
    Education,
    Experience,
    Certification
} from './index';

export interface Consultant {
    id: string;
    urlProfileImage: string;
    firstName: string;
    lastName: string;
    secondName?: string;
    title: string;
    practice: string;
    email: string;
    username: string;
    address: Address;
    phone1: number;
    phone2?: number;
    fax?: number;
    urlLinkedIn?: string;
    urlGitHub?: string;
    urlWordpress?: string;
    urlPersonal?: string;
    certifications: Certification[];
    coreSkills: Skill[];
    technicalSkills: Skill[];
    education: Education[];
    experience: Experience[];
}
