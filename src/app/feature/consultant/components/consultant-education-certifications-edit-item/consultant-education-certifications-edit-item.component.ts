import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consultant-education-certifications-edit-item',
  templateUrl: './consultant-education-certifications-edit-item.component.html',
  styleUrls: ['./consultant-education-certifications-edit-item.component.scss']
})
export class ConsultantEducationCertificationsEditItemComponent implements OnInit {

	@Input() parentForm: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
