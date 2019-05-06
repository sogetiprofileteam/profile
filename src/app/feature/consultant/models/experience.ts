import {
    Description
} from './index';

export interface Experience {
    id: string;
    companyName: string;
    descriptions: Description[];
    startDate: Date;
    endDate?: Date;
    title: string;
}
