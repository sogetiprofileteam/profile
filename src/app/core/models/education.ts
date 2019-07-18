export interface Education {
    id: string;
    school: {
        name: string,
        id: string
    };
    levelOfDegree?: string;
    subject: string;
    startDate: Date;
    endDate?: Date;
}
