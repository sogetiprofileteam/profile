import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-portfolio-item',
  templateUrl: './portfolio-item.component.html',
  styleUrls: ['./portfolio-item.component.scss']
})
export class PortfolioItemComponent implements OnInit {
  @Input() name: string;
  @Input() title: string;
  @Input() practice: string;
  @Input() skills: any;

  constructor() { }

  ngOnInit() {
  }

}
