import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordPageComponent } from './record-page/record-page.component';
import { EventDetailsComponent } from './history-page/event-details/event-details.component';
import { AuthGuard } from '../shared/services/auth.guard';

const routes: Routes = [
  {path: '', component: SystemComponent, canActivate: [AuthGuard], children: [
    {path: 'bill', component: BillPageComponent},
    {path: 'history', component: HistoryPageComponent},
    {path: 'planning', component: PlanningPageComponent},
    {path: 'record', component: RecordPageComponent},
    {path: 'history/:id', component: EventDetailsComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
