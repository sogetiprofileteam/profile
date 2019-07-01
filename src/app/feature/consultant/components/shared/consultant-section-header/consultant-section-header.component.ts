import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-consultant-section-header',
  templateUrl: './consultant-section-header.component.html',
  styleUrls: ['./consultant-section-header.component.scss']
})
export class ConsultantSectionHeaderComponent {
  @Input() title: string;
  @Input() titleColor: 'primary' | 'accent' | 'warn';
  @Input() underline: boolean;
}
