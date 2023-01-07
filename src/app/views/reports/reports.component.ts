import { Component } from '@angular/core';
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

    showCheckouts = true;
    showReceives  = true;

    constructor(private http: HttpClient, private modalService: NgbModal) { }

    ngOnInit() {
        this.http.get("http://localhost:8000/transactions/view/all/").subscribe((res: any) => {
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
    }

    extract(data: any) {
        return data;
    }

    inspectTransaction(transaction: any, modal: any) {
        this.currentlySelectedTransaction = transaction;

        this.modalService.open(modal, { size: 'lg' });
    }
}
