import { Education } from './../../../../core/models/education';
import { Experience } from './../../../../core/models/experience';
import { Consultant } from './../../../../core/models/consultant';
import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

import { ConsultantHeaderEditComponent } from '../consultant-header-edit/consultant-header-edit.component';
import { ConsultantPictureEditComponent } from '../consultant-picture-edit/consultant-picture-edit.component';

import { ExportProfile } from '@feature/consultant/services/export-profile/export-profile.service';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';

import { SKILL_CORE, SKILL_TECHNICAL } from '@core/models';
import { map, tap } from 'rxjs/operators';
import { filterSortDisplaySkills } from '@feature/consultant/shared/helpers/filter-sort-display-skills';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-consultant-header',
  templateUrl: './consultant-header.component.html',
  styleUrls: ['./consultant-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConsultantHeaderComponent {

  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog,
  ) { }

  consultant$ = this.consultantStore.consultant$;

  private consultant: Consultant;

  coreSkills$ =
      this.consultantStore.consultant$
        .pipe(
          map(c => filterSortDisplaySkills(c.coreSkills))
        );

  openEditHeaderDialog(): void {
    this.dialog.open(ConsultantHeaderEditComponent);
  }

  openEditPictureDialog() {
    this.dialog.open(ConsultantPictureEditComponent, { width: '500px' });
  }

  exportProfile(consultant) {

    const experience = consultant.Experience;

    const edu = consultant.Education;


    const experiences = [
      {
        isCurrent: true,
        summary: 'Full-stack developer working with Angular and Java. Working for the iShares platform',
        title: 'Associate Software Developer',
        startDate: {
          month: 11,
          year: 2017,
        },
        company: {
          name: 'BlackRock',
        },
      },
      {
        isCurrent: false,
        summary:
          'Summary 2',
        title: 'Software Developer',
        endDate: {
          month: 11,
          year: 2017,
        },
        startDate: {
          month: 10,
          year: 2016,
        },
        company: {
          name: 'Torch Markets',
        },
      },
      {
        isCurrent: false,
        summary:
          'Summary 3',
        title: 'Software Developer',
        endDate: {
          month: 10,
          year: 2016,
        },
        startDate: {
          month: 3,
          year: 2015,
        },
        company: {
          name: 'Soundmouse',
        },
      },
      {
        isCurrent: false,
        summary:
          'Summary 4',
        title: 'Java Developer',
        endDate: {
          month: 10,
          year: 2014,
        },
        startDate: {
          month: 3,
          year: 2013,
        },
        company: {
          name: 'Soundmouse',
        },
      }
    ];

    const education = [
      {
        degree: 'Master of Science (MSc)',
        fieldOfStudy: 'Computer Science',
        notes:
          'Notes 1',
        schoolName: 'University College London',
        startDate: {
          year: 2012,
        },
        endDate: {
          year: 2013,
        },
      },
      {
        degree: 'Bachelor of Engineering (BEng)',
        fieldOfStudy: 'Material Science and Engineering',
        notes:
          'Notes 2',
        schoolName: 'Imperial College London',
        startDate: {
          year: 2009,
        },
        endDate: {
          year: 2012,
        },
      }
    ];

    const skills = [
      {
        name: 'Angular',
      },
      {
        name: 'TypeScript',
      },
      {
        name: 'JavaScript',
      },
      {
        name: 'NodeJS',
      }
    ];

    const achievements = [
      {
        issuer: 'Oracle',
        name: 'Oracle Certified Expert',
      }
    ];

    const personal = [
      {
        id: consultant.id,
        firstName: consultant.firstName,
        lastName: consultant.lastName,
        status: consultant.status,
        phone: consultant.phone,
        title: consultant.title,
        practice: consultant.practice,
        email: consultant.email,
        address: consultant.address
      }
    ];

    // console.log('personal:' + JSON.stringify(personal) +
    //   '\nexp: ' + JSON.stringify(consultant.experience) +
    //   '\nedu:' + JSON.stringify(consultant.education) +
    //   '\ncs: ' + JSON.stringify(consultant.coreSkills) +
    //   '\ncs: ' + JSON.stringify(consultant.technicalSkills) +
    //   '\ncert' + JSON.stringify(consultant.certifications)
    //   );

    const documentCreator = new ExportProfile();
    const doc = documentCreator.create(
          personal,
          consultant.experience,
          consultant.education,
          consultant.coreSkills,
          consultant.technicalSkills,
          consultant.certifications
        );

    const packer = new Packer();

    packer.toBlob(doc).then(blob => {
      console.log(blob);
      saveAs(blob, consultant.firstName + '_' + consultant.lastName + '_resume.docx');
      console.log('Document created successfully');
    });
  }

}
