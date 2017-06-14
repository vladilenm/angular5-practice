import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SystemComponent } from './system.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordPageComponent } from './record-page/record-page.component';

const routes: Routes = [
  {path: '', component: SystemComponent, children: [
    {path: 'bill', component: BillPageComponent},
    {path: 'history', component: HistoryPageComponent},
    {path: 'planning', component: PlanningPageComponent},
    {path: 'record', component: RecordPageComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
