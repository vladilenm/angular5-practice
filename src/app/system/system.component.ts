import { Component, HostBinding } from '@angular/core';
import { routingFadeTrigger } from '../shared/animations/routing.animations';

@Component({
  selector: 'wfm-system',
  templateUrl: './system.component.html',
  animations: [routingFadeTrigger]
})
export class SystemComponent {
  @HostBinding('@routeState') animatedRoute = true;
}
