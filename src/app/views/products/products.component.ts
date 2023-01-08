import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.scss']
})

export class ProductsComponent {
    downloadedProducts = [];

    productTag: any     = null;
    productName: any    = null;
    productExp: any     = null;
    productOnHand: any  = 0;
    productReorder: any = 0;

    constructor(private http: HttpClient, private modalService: NgbModal) { }

    ngOnInit() {
        this.downloadProducts();
    }

    extract(data: any) {
        return data;
    }

    openView(view: any) {
        this.modalService.open(view, { size: "lg" });
    }

    validateForm() {
        return this.productTag && this.productName && this.productExp;
    }

    createItem() {
        this.http.post("http://localhost:8000/products/create", {
                product_tag:     this.productTag,
                product_name:    this.productName,
                product_qty:     this.productOnHand,
                product_reorder: this.productReorder,
                exp_date:        this.productExp
            }).subscribe((data) => {
                console.log(data);
            });

        this.resetItem();
        this.downloadProducts();
    }

    resetItem() {
        this.productTag     = null;
        this.productName    = null;
        this.productExp     = null;
        this.productOnHand  = 0;
        this.productReorder = 0;
    }

    downloadProducts() {
        this.http.get("http://localhost:8000/products/list").subscribe((res: any) => {
            this.downloadedProducts = res;
        });
    }
}
