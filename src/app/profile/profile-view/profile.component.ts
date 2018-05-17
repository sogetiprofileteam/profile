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
  summaryEdit: boolean;
  public profile: Profile = new Profile();
  constructor(private route: ActivatedRoute, private profileViewService: ProfileViewService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      try {
        this.profile = await this.profileViewService.get(id);
      } catch (err) {
        console.log(err);
      }
    });
  }

  public onProfileImgUploaded(event: string) {
    console.log(event); // should be the object id
  }
}
