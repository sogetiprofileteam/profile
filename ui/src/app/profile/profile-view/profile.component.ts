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

  public profile: Profile;
  constructor(private route: ActivatedRoute, private profileViewService: ProfileViewService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params => {
      const id = params.get('id');
      try {
        this.profile = await this.profileViewService.get(id);
        console.log(this.profile);
      } catch (err) {
        console.log(err);
      }
    });
  }
}