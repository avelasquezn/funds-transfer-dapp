import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
  formSubmitted = false;
  userForm: FormGroup;
  user: any;

  accountValidationMessages = {
    transferAddress: [
      { type: 'required', message: 'Transfer Address is required'},
      { type: 'minLength', message: 'Transfer Address must be 42 characters long'},
      { type: 'maxlength', message: 'Transfer Address must be 42 characters long'}
    ],
    amount: [
      { type: 'required', message: 'Amount is required'},
      { type: 'pattern', message: 'AMount must be a positive number'}
    ],
    remarks: [
      {type: 'required', message: 'Remarks are required'}
    ]
  }
  constructor(private builder: FormBuilder) {}

  ngOnInit() {
    this.formSubmitted = false;
    this.user = { address: '', transferAddress: '', balance: '', amount: '', remarks: '' };
    this.getAccountBalance();
    this.createForms();
  }

  createForms() {
    this.userForm = this.builder.group({
      transferAddress: new FormControl(this.user.transferAddress, Validators.compose([
        Validators.required,
        Validators.minLength(42),
        Validators.maxLength(42)
      ])),
      amount: new FormControl(this.user.amount, Validators.compose([
        Validators.required,
        Validators.pattern('ˆ[+]?([.]\\d+|\\d+[.]?\\d*)$')
      ])),
      remarks: new FormControl(this.user.remarks, Validators.compose([
        Validators.required
      ]))
    });
  }

  getAccountBalance = () => {
    const that = this;
    that.user.address = '';
    that.user.balance = 0;
    // TODO: fetch data
  }

  submitForm() {
    if (this.userForm.invalid) {
      alert('transfer.component :: submitForm :: Form invalid');
      return;
    } else {
      console.log('transfer.component :: submitForm :: this.userForm.value');
      console.log(this.userForm.value);
      // TODO: service call
    }
  }
}
