import { Consultant } from '@core/models/index';

export const mockConsultant: Consultant = {
    id: 1,
    urlProfileImage: '../../../../../assets/mock-profile-picture.jpg',
    firstName: 'Jane',
    lastName: 'Barnes',
    title: {
        id: 1,
        name: 'Consultant'
    },
    practice: {
        id: 1,
        name: 'ACT',
        longName: 'Applications and Cloud Technology'
    },
    email: 'jane.barnes@us.sogeti.com',
    username: 'jbarnes',
    address: {
        street1: '1234 Fake Street',
        city: {
            id: 1,
            name: 'Austin'
        },
        state: {
            id: 1,
            name: 'Texas'
        },
        zipcode: 78732
    },
    phone1: 5129999999,
    urlLinkedIn: 'https://linkedin.com',
    urlGitHub: 'https://github.com',
    urlWordpress: 'https://wordpress.com',
    urlPersonal: 'https://google.com',
    coreSkills: [
        {
            id: 1,
            name: 'Software development'
        },
        {
            id: 2,
            name: 'Time management'
        },
        {
            id: 3,
            name: 'Prioritizing'
        }
    ],
    technicalSkills: [
        {
            id: 1,
            name: 'Angular'
        },
        {
            id: 2,
            name: 'Microsoft Office Suite'
        },
        {
            id: 3,
            name: 'HTML'
        },
        {
            id: 4,
            name: 'CSS'
        },
        {
            id: 5,
            name: 'JavaScript'
        },
        {
            id: 6,
            name: 'TypeScript'
        }
    ],
    education: [
        {
            name: 'UT Austin',
            degree: 'Computer Science',
            startDate: new Date('August 1, 2012'),
            endDate: new Date('May 1, 2016'),
            details: 'Details',
            city: {
                id: 1,
                name: 'Austin'
            },
            state: {
                id: 1,
                name: 'Texas'
            }
        }
    ],
    experience: [
        {
            company: 'Sogeti USA',
            position: 'Consultant',
            startDate: new Date(''),
            details: 'Details',
            city: {
                id: 1,
                name: 'Austin'
            },
            state: {
                id: 1,
                name: 'Texas'
            }
        }
    ]
};
