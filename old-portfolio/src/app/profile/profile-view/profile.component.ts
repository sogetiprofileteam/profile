import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileViewService } from './profile-view.service';
import { Profile } from '../../models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: string;
  summaryEdit: boolean;
  public profile: Profile = new Profile();
  constructor(private route: ActivatedRoute, private profileViewService: ProfileViewService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      this.id = params.get('id');
      try {
        this.profile = await this.profileViewService.get(this.id);
      } catch (err) {
        console.log(err);
      }
    });
  }

  async editProfile() {
    await this.profileViewService.updateProfile(this.id, this.profile).toPromise();
    console.log(this.id);
    console.log(this.profile);
  }

  public onProfileImgUploaded(event: string) {
    console.log(event); // should be the object id
  }
}
