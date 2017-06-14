import { Component, OnInit } from '@angular/core';
import { User } from '../../../../shared/models/user.model';

@Component({
  selector: 'wfm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(window.localStorage.getItem('user'));
  }

}
