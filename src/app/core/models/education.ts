import { School } from './school';

export interface Education {
  id: string;
  school: School;
  levelOfDegree?: string;
  subject: string;
  startDate: Date;
  endDate?: Date;
}
