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
            name: 'Software development',
            display: true
        },
        {
            id: '2',
            name: 'Time management',
            display: true
        },
        {
            id: '3',
            name: 'Prioritizing',
            display: true
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
            id: '10',
            name: 'Angular',
            display: true
        },
        {
            id: '60',
            name: 'Microsoft Office Suite',
            display: false
        },
        {
            id: '40',
            name: 'HTML',
            display: true
        },
        {
            id: '30',
            name: 'CSS',
            display: true
        },
        {
            id: '50',
            name: 'JavaScript',
            display: false
        },
        {
            id: '20',
            name: 'TypeScript',
            display: true
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
