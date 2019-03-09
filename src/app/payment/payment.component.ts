import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  public payuform: any = {
    email: 'bagulm123@gmail.com',
    name: 'Mahendra Bagul',
    phone: '+91 8484947814',
    productinfo: 'Google Home Mini'
  };
  disablePaymentButton = true;
  constructor(private http: HttpClient) { }

  confirmPayment() {
    const paymentPayload = {
      email: this.payuform.email,
      name: this.payuform.name,
      phone: this.payuform.phone,
      productinfo: this.payuform.productinfo,
      amount: this.payuform.amount
    };
    return this.http.post<any>('https://paypal-integration-service.herokuapp.com'
      + '/v1/payment/gateway/payumoney/payment-details', paymentPayload).subscribe(
        data => {
          this.payuform.txnid = data.txnid;
          this.payuform.surl = data.surl;
          this.payuform.furl = data.furl;
          this.payuform.key = data.key;
          this.payuform.hash = data.hash;
          this.disablePaymentButton = false;
        }, error1 => {
          console.log(error1);
        });
  }

  ngOnInit() {
  }
}

