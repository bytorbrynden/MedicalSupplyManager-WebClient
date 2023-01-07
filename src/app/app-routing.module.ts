import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { ReportsComponent } from './views/reports/reports.component';

const routes: Routes = [
    {
        path: "dashboard",
        component: DashboardComponent
    },
    {
        path: "reports",
        component: ReportsComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
