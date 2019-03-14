import {
    Address,
    CoreSkill,
    Education,
    Experience,
    Practice,
    TechnicalSkill,
    Title
} from './index';

export interface Consultant {
    id: number;
    urlProfileImage: string;
    firstName: string;
    lastName: string;
    displayName?: string;
    title: Title;
    practice: Practice;
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
    coreSkills: CoreSkill[];
    technicalSkills: TechnicalSkill[];
    education: Education[];
    experience: Experience[];
}
