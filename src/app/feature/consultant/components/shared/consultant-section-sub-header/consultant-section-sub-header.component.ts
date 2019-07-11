import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-consultant-section-sub-header',
  templateUrl: './consultant-section-sub-header.component.html',
  styleUrls: ['./consultant-section-sub-header.component.scss']
})
export class ConsultantSectionSubHeaderComponent {

  @Input() title: string;
  @Input() titleColor: 'primary' | 'accent' | 'warn';
  @Input() underline: boolean;

}
