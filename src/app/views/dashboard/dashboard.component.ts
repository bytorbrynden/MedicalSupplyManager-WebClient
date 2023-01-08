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

    productNotExistErr: boolean = false;

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

    async doesProductExist(productTag: string): Promise<boolean> {
        var product: any = await this.http.get("http://localhost:8000/products/productByTag/" + productTag).toPromise();

        return (product.length > 0);
    }

    async getProduct(productTag: string): Promise<any> {
        return await this.http.get("http://localhost:8000/products/productByTag/" + productTag).toPromise();
    }

    transactionHasItem(productCode: string) {
        for (var i = 0; i < this.currentTransactionItems.length; i++) {
            if (this.currentTransactionItems[i].productCode == productCode)
                return i;
        }

        return -1;
    }

    async addItemToCheckoutTrans(productCode: string, productQty: number) {
        if (productCode != "" && productQty != null) {
            if ((await this.getProduct(productCode)).length > 0) {
                var transactionIndex = this.transactionHasItem(productCode);

                if (transactionIndex == -1) {
                    this.currentTransactionItems.push(this.TransactionItem(productCode, productQty));
                } else {
                    this.currentTransactionItems[transactionIndex].productQty += productQty;
                }

                this.transactionProductCode = "";
                this.transactionProductQty = 1;
                this.productNotExistErr = false;
            } else {
                this.productNotExistErr = true;
            }
        }
    }

    removeItemFromCheckoutTrans(index: number) {
        this.currentTransactionItems.splice(index, 1);
    }

    async performTransaction(type: number, note: string) {
        let transactionId = Date.now();
        let transactionDate = (new Date());

        for (var i = 0; i < this.currentTransactionItems.length; i++) {
            var currItem = this.currentTransactionItems[i];
            var product  = (await this.getProduct(currItem.productCode))[0];

            this.http.post("http://localhost:8000/transactions/new", {
                transaction_id: transactionId,
                t_type: type,
                admin_id: "admin",
                product_id: product.product_id,
                qty_change: currItem.productQty,
                note: note,
                date: transactionDate
            }).subscribe((data) => { });
        }

        this.currentTransactionItems = [ ];
    }
}
