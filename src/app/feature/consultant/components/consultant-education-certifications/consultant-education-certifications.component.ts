import { Component, OnInit } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';
import { ConsultantEducationCertificationsEditComponents } from '../consultant-education-certifications-edit/consultant-education-certifications-edit.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-consultant-education-certifications',
  templateUrl: './consultant-education-certifications.component.html',
  styleUrls: ['./consultant-education-certifications.component.scss']
})
export class ConsultantEducationCertificationsComponent implements OnInit {

  constructor(
    private consultantStore: ConsultantStore,
    private dialog: MatDialog,
  ) { }

  consultant$ = this.consultantStore.consultant$;

  ngOnInit() {
  }

  openEditCertificationEducationDialog() {
    this.dialog.open(ConsultantEducationCertificationsEditComponents);
	}

}
