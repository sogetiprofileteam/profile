import { Component, OnInit } from '@angular/core';

import { Profile } from '../../models/profile';
import { ProfileAddService } from './profile-add.service';
import { PracticeService } from '../../shared/services/practice.service';

@Component({
  selector: 'app-portfolio-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.scss']
})
export class ProfileAddComponent implements OnInit {

  public practices: string[];
  public profile: Profile = new Profile();

  constructor(private service: ProfileAddService, private practiceService: PracticeService) { }

  async ngOnInit() {
    this.practices = await this.practiceService.get().toPromise();
  }

  onSubmit() {
    console.log(this.profile);
    this.service.postProfile(this.profile).subscribe(res => {
      console.log('successful');
    }, error => {
      console.log('error');
    });

  }

}
