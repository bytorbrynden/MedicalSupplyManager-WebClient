import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ReportsComponent } from './views/reports/reports.component';

const routes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent,
        title: "Dashboard | Medical Supply Manager"
    },
    {
        path: "reports",
        component: ReportsComponent,
        title: "Reports | Medical Supply Manager"
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
