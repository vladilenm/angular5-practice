import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { SystemRoutingModule } from './system-routing.module';
import { SystemComponent } from './system.component';
import { BillPageComponent } from './bill-page/bill-page.component';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import { BillService } from './shared/services/bill.service';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecordPageComponent } from './record-page/record-page.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { CategoriesService } from './shared/services/categories.service';
import { AddEventComponent } from './record-page/add-event/add-event.component';
import { AddCategoryComponent } from './record-page/add-category/add-category.component';
import { EventsService } from './shared/services/events.serrvice';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    SystemRoutingModule
  ],
  declarations: [
    HeaderComponent,
    SidebarComponent,
    SystemComponent,
    BillPageComponent,
    BillCardComponent,
    CurrencyCardComponent,
    HistoryPageComponent,
    PlanningPageComponent,
    RecordPageComponent,
    DropdownDirective,
    AddEventComponent,
    AddCategoryComponent
  ],
  providers: [BillService, CategoriesService, EventsService]
})
export class SystemModule {
}
