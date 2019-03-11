import {
    City,
    State
} from './index';

export interface Education {
    name: string;
    degree?: string;
    startDate: Date;
    endDate?: Date;
    details: string;
    city: City;
    state: State;
}
