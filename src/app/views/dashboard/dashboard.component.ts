import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent {
    constructor(private modalService: NgbModal, private http: HttpClient) { }

    Transaction = ((items: any[], note: string) => {
        return {
            "note": note,
            "items": items
        };
    });

    TransactionItem = ((code: string, quantity: number) => {
        return {
            "productCode": code,
            "productQty": quantity
        };
    });

    currentTransactionItems: any[] = [ ];
    receiveTransactionItems: any[]  = [ ];

    transactionProductCode: string = "";
    transactionProductQty: number = 1;
    transactionNote: string = "";

    downloadedTransactions: any = [ ];
    downloadedReceiveTransactions: any = [ ];

    activeTransactionType: number = 0;
    activeListType: number = 0;

    openView(view: any, size: string) {
        this.modalService.open(view, { size: size });
    }

    cancelCheckout() {
        this.currentTransactionItems = [ ];
    }

    cancelReview() {
        this.receiveTransactionItems = [ ];
    }

    addItemToCheckoutTrans(productCode: string, productQty: number) {
        if (productCode != "" && productQty != null)
            this.currentTransactionItems.push(this.TransactionItem(productCode, productQty));
    }

    removeItemFromCheckoutTrans(index: number) {
        this.currentTransactionItems.splice(index, 1);
    }

    performTransaction(type: number, note: string) {
        let transactionId = Date.now();
        let transactionDate = (new Date());

        for (var i = 0; i < this.currentTransactionItems.length; i++) {
            var currItem = this.currentTransactionItems[i];

            this.http.post("http://localhost:8000/transactions/new", {
                transaction_id: transactionId,
                t_type: type,
                admin_id: 0,
                product_id: currItem.productCode,
                qty_change: currItem.productQty,
                note: note,
                date: transactionDate
            }).subscribe((data) => {
                console.log(data);
            });
        }

        this.currentTransactionItems = [ ];
    }
}
