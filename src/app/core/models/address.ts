import {
    City,
    State
} from './index';

export interface Address {
    street1: string;
    street2?: string;
    city: City;
    state: State;
    zipcode: number;
}
