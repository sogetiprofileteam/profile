import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-consultant-section-experience-header',
  templateUrl: './consultant-section-experience-header.component.html',
  styleUrls: ['./consultant-section-experience-header.component.scss']
})
export class ConsultantSectionExperienceHeaderComponent {
  @Input() title: string;
  @Input() icon: string;
  @Output() actionClicked = new EventEmitter();

  count: number;
  icons: [];

  actionDispatch() {
    this.actionClicked.emit();
  }
}
