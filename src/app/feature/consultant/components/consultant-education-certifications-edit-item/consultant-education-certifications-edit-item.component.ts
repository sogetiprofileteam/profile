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
    // this.parentForm.value.schoolName = '';
    // this.parentForm.value.eduOrCertName.value = '1';
    // this.parentForm.value.levelOfDegreeName.value = '';
    // this.parentForm.value.endDateName.value = '';
    
  }

  ngOnInit() {
    this.eduOrCertName = `eduOrCert${this.item}`;
    this.schoolName = `school${this.item}`;
    this.levelOfDegreeName = `levelOfDegree${this.item}`;
    this.endDateName = `endDate${this.item}`;

    
    this.parentForm.value[`eduOrCert${this.item}`] = '1';
    this.parentForm.value[`school${this.item}`] = '';
    this.parentForm.value[`levelOfDegree${this.item}`] = '';
    this.parentForm.value[`endDate${this.item}`] = '';
    console.log("this.parentform: ", this.parentForm)
    console.log("this.item: ", this.item)
  
  }

  onDelete(item){
    this.onDeleteEvent.emit(item);
  }

}
