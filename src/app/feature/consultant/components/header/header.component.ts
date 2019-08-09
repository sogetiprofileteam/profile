import { Consultant } from '@core/models';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

import { HeaderEditComponent } from './header-edit/header-edit.component';
import { HeaderPictureEditComponent } from './header-picture-edit/header-picture-edit.component';

import { ExportProfile } from '@feature/consultant/components/header/export-profile';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-consultant-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {

  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog,
  ) { }

  consultant$ = this.consultantStore.consultant$;


  openEditHeaderDialog(): void {
    this.dialog.open(HeaderEditComponent);
  }

  openEditPictureDialog() {
    this.dialog.open(HeaderPictureEditComponent, { width: '500px' });
  }

  exportProfile(consultant: Consultant) {

    const personal = [
      {
        id: consultant.id,
        firstName: consultant.firstName,
        lastName: consultant.lastName,
        summary: consultant.summary,
        status: consultant.status,
        phone: consultant.phone,
        title: consultant.title,
        practice: consultant.practice,
        email: consultant.email,
        address: consultant.address
      }
    ];

    /* TODO: Used for debugging...
      console.log('personal:' + JSON.stringify(personal) +
      '\nexp: ' + JSON.stringify(consultant.experience) +
      '\nedu:' + JSON.stringify(consultant.education) +
      '\ncs: ' + JSON.stringify(consultant.coreSkills) +
      '\ncs: ' + JSON.stringify(consultant.technicalSkills) +
      '\ncert' + JSON.stringify(consultant.certifications)
      );
    */
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
