import { Injectable } from '@angular/core';
import { Payment } from '../interfaces/payment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PaymentsService {
  url = '../../assets/payments.json';
  postUrl = 'use any API url here please for this damn thing to work!';

  payments = [] as Payment[];
  payments$: Observable<Array<Payment>>;
  private paymentsSubject = new Subject<Array<Payment>>();

  constructor(private http: HttpClient) {
    this.payments$ = this.paymentsSubject.asObservable();
  }

  /// save payments
  savePayment(payment: Payment): Observable<Payment> {
    console.log(payment);
    return this.http.post<any>(this.postUrl, payment).pipe(tap(
      _ => console.log(payment)
    ));
  }

  /// get payments
  getPayments(): Observable<any[]> {
    return this.http.get<any[]>(this.url).pipe(tap(data => console.log(data)));
  }


}
