import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consultant-education-certifications-edit-item',
  templateUrl: './consultant-education-certifications-edit-item.component.html',
  styleUrls: ['./consultant-education-certifications-edit-item.component.scss']
})
export class ConsultantEducationCertificationsEditItemComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() index;
  @Input() panelOpen: boolean;

  eduOrCertName: string;
  schoolName: string;
  levelOfDegreeName: string;
  endDateName: string;

  constructor() {
  }

  ngOnInit() {
    this.eduOrCertName = `eduOrCert${this.index}`;
    this.schoolName = `school${this.index}`;
    this.levelOfDegreeName = `levelOfDegree${this.index}`;
    this.endDateName = `endDate${this.index}`;
  }

}
