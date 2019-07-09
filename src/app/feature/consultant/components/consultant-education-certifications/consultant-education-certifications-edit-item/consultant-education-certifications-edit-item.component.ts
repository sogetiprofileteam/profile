import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-consultant-education-certifications-edit-item',
  templateUrl: './consultant-education-certifications-edit-item.component.html',
  styleUrls: ['./consultant-education-certifications-edit-item.component.scss']
})
export class ConsultantEducationCertificationsEditItemComponent implements OnInit {

  @Input() parentForm: FormGroup;
  @Input() item: number;
  @Input() index: number;
  @Input() panelOpen: boolean;
  @Input() openSpecifed: boolean;
  @Output() DeleteEvent = new EventEmitter<number>();

  eduOrCertName: string;
  schoolName: string;
  levelOfDegreeName: string;
  endDateName: string;

  constructor() { }

  ngOnInit() {
    this.eduOrCertName = `eduOrCert${this.item}`;
    this.schoolName = `school${this.item}`;
    this.levelOfDegreeName = `levelOfDegree${this.item}`;
    this.endDateName = `endDate${this.item}`;
    if (this.item === 0) {
      this.parentForm.reset();
    }
  }

  onDelete(item: number) {
    this.DeleteEvent.emit(item);
  }

  orOperation(panelOpen, openSpecifed): boolean {
    return panelOpen || openSpecifed;
  }
}
