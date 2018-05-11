import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-profile-item',
  templateUrl: './profile-item.component.html',
  styleUrls: ['./profile-item.component.scss']
})
export class ProfileItemComponent implements OnInit {
  @Input() name: string;
  @Input() title: string;
  @Input() practice: string;
  @Input() skills: string[];
  @Input() id: string;

  constructor() { }

  ngOnInit() {
    console.log(this.id);
  }

}
