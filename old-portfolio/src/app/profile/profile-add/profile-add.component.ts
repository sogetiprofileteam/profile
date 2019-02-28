import { Component, OnInit } from '@angular/core';

import { Profile } from '../../models/profile';
import { ProfileAddService } from './profile-add.service';
import { PracticeService } from '../../shared/services/practice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-portfolio-add',
  templateUrl: './profile-add.component.html',
  styleUrls: ['./profile-add.component.scss']
})
export class ProfileAddComponent implements OnInit {
  id: string;

  public practices: string[];
  public profile: Profile = new Profile();
  public skillList = '';

  constructor(
    private service: ProfileAddService, 
    private practiceService: PracticeService,
    private router: Router) { }

  async ngOnInit() {
    this.practices = await this.practiceService.get().toPromise();
  }

  onSubmit() {
    this.profile.skills = this.skillList.split(/[\s,;]+/);
    this.service.postProfile(this.profile).subscribe(res => {
      console.log('successful');
      this.id = res;
      console.log(this.id);
      this.router.navigate([`../profile/${this.id}`]);
    }, error => {
      console.log('error');
    });

  }

}
