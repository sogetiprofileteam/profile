import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consultant-education-certifications-edit-item',
  templateUrl: './consultant-education-certifications-edit-item.component.html',
  styleUrls: ['./consultant-education-certifications-edit-item.component.scss']
})
export class ConsultantEducationCertificationsEditItemComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() item: Number;
  @Input() panelOpen: boolean;
  @Output() onDeleteEvent = new EventEmitter<Number>();

  eduOrCertName: string;
  schoolName: string;
  levelOfDegreeName: string;
  endDateName: string;

  constructor() {
  }

  ngOnInit() {
    this.eduOrCertName = `eduOrCert${this.item}`;
    this.schoolName = `school${this.item}`;
    this.levelOfDegreeName = `levelOfDegree${this.item}`;
    this.endDateName = `endDate${this.item}`;
  }

  onDelete(index){
    this.onDeleteEvent.emit(index);
  }

}
