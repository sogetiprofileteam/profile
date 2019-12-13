import {
    Description
} from './index';

export interface Experience {
    id: string;
    companyName: string;
    summary: string;
    descriptions: Description[];
    startDate: Date;
    endDate?: Date;
    title: string;
}
