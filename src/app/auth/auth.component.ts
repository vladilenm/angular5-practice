import { Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routingFadeTrigger } from '../shared/animations/routing.animations';

@Component({
  selector: 'wfm-auth',
  templateUrl: './auth.component.html',
  animations: [routingFadeTrigger]
})
export class AuthComponent implements OnInit {
  @HostBinding('@routeState') animatedRoute = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.navigate(['/login']);
  }
}
