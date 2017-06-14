import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemComponent } from './system.component';
import { BillPageComponent } from './bill-page/bill-page.component';

const routes: Routes = [
  {path: '', component: SystemComponent, children: [
    {path: 'bill', component: BillPageComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
