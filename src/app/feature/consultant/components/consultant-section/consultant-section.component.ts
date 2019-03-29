import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-consultant-section',
  templateUrl: './consultant-section.component.html',
  styleUrls: ['./consultant-section.component.scss']
})
export class ConsultantSectionComponent {
  @Input() title: string;
}
