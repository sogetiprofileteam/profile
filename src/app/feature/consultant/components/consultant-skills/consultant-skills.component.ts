import { Component, OnInit } from '@angular/core';
import { ConsultantStore } from '@feature/consultant/services/consultant-store/consultant-store.service';

@Component({
  selector: 'app-consultant-skills',
  templateUrl: './consultant-skills.component.html',
  styleUrls: ['./consultant-skills.component.scss']
})
export class ConsultantSkillsComponent implements OnInit {

  constructor(
    private consultantStore: ConsultantStore
  ) { }

  consultant$ = this.consultantStore.consultant$;

  ngOnInit() {
  }

  openEditSkillsDialog() {
    // Open dialog containing edit skills component
  }

}
