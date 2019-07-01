import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-consultant-edu-cert-section-header',
  templateUrl: './consultant-edu-cert-section-header.component.html',
  styleUrls: ['./consultant-edu-cert-section-header.component.scss']
})
export class ConsultantEduCertSectionHeaderComponent {
  @Input() title: string;
  @Input() icon: string;
  @Input() eduOrCert: number;
  @Output() actionClicked = new EventEmitter();

  actionDispatch() {
    this.actionClicked.emit(this.eduOrCert);
  }
}
