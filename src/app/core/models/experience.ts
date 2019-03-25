import {
    City,
    State
} from './index';

export interface Experience {
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    details: string;
    city: City;
    state: State;
}
