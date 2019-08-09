import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-section-sub-header',
  templateUrl: './section-sub-header.component.html',
  styleUrls: ['./section-sub-header.component.scss']
})
export class SectionSubHeaderComponent {

  @Input() title: string;
  @Input() titleColor: 'primary' | 'accent' | 'warn';
  @Input() underline: boolean;

}
