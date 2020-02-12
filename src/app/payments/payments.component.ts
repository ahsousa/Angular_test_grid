import { Component, OnInit, OnDestroy } from '@angular/core';
import { Payment } from '../interfaces/payment';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ScoreService } from '../shared/score.service';
import { Subscription } from 'rxjs';
import { PaymentsService } from './payments.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit, OnDestroy {
  header = ['Name', 'Amount', 'code', 'grid'];
  payments = [] as Payment[];
  lines = [1, 2, 3, 4, 5, 6, 7];
  paymentForm: FormGroup;
  paymentField = new FormControl('', Validators.required);
  amountField = new FormControl('', Validators.required);
  noOfGrids: number;
  code: string;
  number = 0;

  subscription: Array<Subscription> = [];

  constructor(
    private fb: FormBuilder,
    private scoreService: ScoreService,
    private paymentsService: PaymentsService
    ) {
    this.paymentForm = fb.group({
      'paymentField': this.paymentField,
      'amountField': this.amountField
    });
   }

  ngOnInit() {
    this.subscription.push(this.scoreService.grid$.subscribe(gridNo => this.noOfGrids = gridNo), this.scoreService.score$.subscribe(score => this.code = score));

    const paymentsInLocalStorage = JSON.parse(localStorage.getItem('payments'));
    const linesInLocalStorage = JSON.parse(localStorage.getItem('lines'));

    if (paymentsInLocalStorage === null || paymentsInLocalStorage.length === 0) {
      this.paymentsService.getPayments()
        .subscribe((payments) => {
          this.payments = payments;
          this.checkLinesToRemove(linesInLocalStorage);
        });
    } else {
      this.payments = paymentsInLocalStorage;
      this.checkLinesToRemove(linesInLocalStorage);
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  checkLinesToRemove(lines): void {
    if (lines === null || lines.length === 0) {
      if (this.payments.length > 7) {
        this.lines = [];
      } else {
        const linesToRemove = this.lines.length - this.payments.length;
        this.lines = this.lines.splice(this.lines[0], linesToRemove);

      }
    }
  }

  onSubmit(): void {
    const payment = {} as Payment;

    if (this.payments.length === 0) {
      payment.id = this.number + 1;

    } else {
      const last = this.payments[this.payments.length - 1];
      // gives the id always by order based on last element of array
      payment.id = last.id + 1;
    }

    payment.name = this.paymentField.value;
    payment.amount = this.amountField.value;
    payment.code = this.code;
    payment.grid = this.noOfGrids;
    this.paymentsService.savePayment(payment);
    this.payments.push(payment);

    // keep value in localStorage
    localStorage.setItem('payments', JSON.stringify(this.payments));
    // this.paymentsService.keepPaymentsInMemory(payment);
    this.lines.pop();
    localStorage.setItem('lines', JSON.stringify(this.lines));
  }

}
