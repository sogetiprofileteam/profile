import { Consultant } from '@feature/consultant/models/index';

export const mockConsultant: Consultant = {
    id: '1',
    urlProfileImage: '../../../../../assets/mock-profile-picture.jpg',
    firstName: 'Jane',
    lastName: 'Barnes',
    title: 'Consultant',
    practice: 'Applications and Cloud Technology',
    email: 'jane.barnes@us.sogeti.com',
    username: 'jbarnes',
    status: '',
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
            name: 'Software development',
            display: true,
            type: 2,
            displayOrder: 1
        },
        {
            id: '2',
            name: 'Time management',
            display: true,
            type: 2,
            displayOrder: 3
        },
        {
            id: '3',
            name: 'Prioritizing',
            display: true,
            type: 2,
            displayOrder: 2
        },
    ],
    technicalSkills: [
        {
            id: '10',
            name: 'Angular',
            display: true,
            type: 1,
            displayOrder: 1
        },
        {
            id: '60',
            name: 'Microsoft Office Suite',
            display: false,
            type: 1,
            displayOrder: null
        },
        {
            id: '40',
            name: 'HTML',
            display: true,
            type: 1,
            displayOrder: 4
        },
        {
            id: '30',
            name: 'CSS',
            display: true,
            type: 1,
            displayOrder: 3
        },
        {
            id: '50',
            name: 'JavaScript',
            display: false,
            type: 1,
            displayOrder: null
        },
        {
            id: '20',
            name: 'TypeScript',
            display: true,
            type: 1,
            displayOrder: 2
        }
    ],
    certifications: [
        {
            id: '1',
            dateRecieved: new Date(),
            name: 'Amazon AWS Engineer',
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
            startDate: new Date(),
            descriptions: [
                {
                    id: '1',
                    summary: 'Lorem ipsum'
                }
            ],
        }
    ]
};
