import { Consultant } from '@core/models/index';

export const mockConsultant: Consultant = {
    id: '1',
    urlProfileImage: '../../../../../assets/mock-profile-picture.jpg',
    firstName: 'Jane',
    lastName: 'Barnes',
    title: 'Consultant',
    practice: 'Applications and Cloud Technology',
    email: 'jane.barnes@us.sogeti.com',
    username: 'jbarnes',
    address: {
        lineOne: '1234 Fake Street',
        city: 'Austin',
        state: 'Texas',
        zipCode: 78732
    },
    phone1: 5129999999,
    urlLinkedIn: 'https://linkedin.com',
    urlGitHub: 'https://github.com',
    urlWordpress: 'https://wordpress.com',
    urlPersonal: 'https://google.com',
    coreSkills: [
        {
            id: '1',
            name: 'Software development'
        },
        {
            id: '2',
            name: 'Time management'
        },
        {
            id: '3',
            name: 'Prioritizing'
        }
    ],
    certifications: [
        {
            id: '1',
            dateRecieved: new Date(),
            name: 'Amazon AWS Engineer',
        }
    ],
    technicalSkills: [
        {
            id: '1',
            name: 'Angular'
        },
        {
            id: '2',
            name: 'Microsoft Office Suite'
        },
        {
            id: '3',
            name: 'HTML'
        },
        {
            id: '4',
            name: 'CSS'
        },
        {
            id: '5',
            name: 'JavaScript'
        },
        {
            id: '6',
            name: 'TypeScript'
        }
    ],
    education: [
        {
            id: '1',
            school: 'UT Austin',
            subject: 'Computer Science',
            startDate: new Date('August 1, 2012'),
            endDate: new Date('May 1, 2016'),
            levelOfDegree: 'Bachelors of Business Administration',
        }
    ],
    experience: [
        {
            id: '1',
            companyName: 'Sogeti USA',
            title: 'Consultant',
            startDate: new Date(''),
            descriptions: [
                {
                    id: '1',
                    summary: 'Lorem ipsum'
                }
            ],
        }
    ]
};
