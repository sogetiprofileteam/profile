import { Component, OnInit } from '@angular/core';
import { Consultant } from '@core/models';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { ExportProfile } from '@feature/consultant/components/download-profile-button/export-profile';
import { Packer } from 'docx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-download-profile-button',
  templateUrl: './download-profile-button.component.html',
  styleUrls: ['./download-profile-button.component.scss']
})
export class DownloadProfileButtonComponent implements OnInit {

  constructor(
    private consultantStore: ConsultantStore
  ) { }

  consultant$ = this.consultantStore.consultant$;

  ngOnInit() {
  }


  exportProfile() {
    const consultant = this.consultantStore.consultant;

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
      saveAs(blob, consultant.firstName + '_' + consultant.lastName + '_Profile.docx');
      console.log('Document created successfully');
    });
  }

}
