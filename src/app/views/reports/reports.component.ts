import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})

export class ReportsComponent {
    sortedTransactions: any = { };
    currentlySelectedTransaction: any = { };

    showCheckouts   = false;
    showReceives    = false;
    reportGenerated = false;

    constructor(private http: HttpClient, private modalService: NgbModal) { }

    extract(data: any) {
        return data;
    }

    inspectTransaction(transaction: any, modal: any) {
        this.currentlySelectedTransaction = transaction;

        this.modalService.open(modal, { size: 'lg' });
    }

    generateReport() {
        var types = [];

        if (this.showCheckouts) types.push(0);
        if (this.showReceives) types.push(1, 2);

        this.sortedTransactions = { };

        this.http.get("http://localhost:8000/transactions/view/all/filtered?types=" + types.toString()).subscribe((res: any) => {
            console.log(res);
            for (var i = 0; i < res.length; i++) {
                var currTransactionId = res[i].transaction_id;
                
                if (this.sortedTransactions[currTransactionId] != null) {
                    this.sortedTransactions[currTransactionId].items.push(res[i]);
                } else {
                    this.sortedTransactions[currTransactionId] = {
                        "transactionId": currTransactionId,
                        "adminId": res[i].admin_id,
                        "type": res[i].t_type,
                        "note": res[i].note,
                        "date": res[i].date,
                        "items": [res[i]]
                    }
                }
            }
        });

        this.reportGenerated = true;
    }
}
