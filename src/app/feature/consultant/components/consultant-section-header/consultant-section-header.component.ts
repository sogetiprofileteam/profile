import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-consultant-section-header',
  templateUrl: './consultant-section-header.component.html',
  styleUrls: ['./consultant-section-header.component.scss']
})
export class ConsultantSectionComponent {
  @Input() title: string;
  @Input() icon: string;
  @Output() actionClicked = new EventEmitter();

  actionDispatch() {
    this.actionClicked.emit();
  }
}
