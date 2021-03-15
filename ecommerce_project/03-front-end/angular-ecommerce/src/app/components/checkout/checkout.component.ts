import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GothamNetworkFormService } from 'src/app/services/gotham-network-form.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;

  totalPrice: number = 0;
  totalQuantity: number = 0;

  creditCardMonths : number[] = [];
  creditCardYears : number[] = [];

  constructor(private formBuilder: FormBuilder, private gothamNetworkFormService: GothamNetworkFormService) { }

  ngOnInit(): void {

    this.checkoutFormGroup = this.formBuilder.group({

      customer: this.formBuilder.group({
        
        firstName: [''],
        lastName: [''],
        email: ['']

      }),

      shippingAddress: this.formBuilder.group({

        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']

      }),

      billingAddress: this.formBuilder.group({

        street: [''],
        city: [''],
        state: [''],
        country: [''],
        zipCode: ['']

      }),

      creditCard: this.formBuilder.group({

        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']

      })

    });

    const startMonth : number = new Date().getMonth() + 1;
    console.log("Start month: " + startMonth);

    this.gothamNetworkFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieved credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )
    
    this.gothamNetworkFormService.getCreditCardYears().subscribe(
      data => {
        console.log("Retrieving credit card years: " + JSON.stringify(data));
        this.creditCardYears = data;
      }
    )

  }

  copyShippingAddressToBillingAddress(event){
    if(event.target.checked){
      this.checkoutFormGroup.controls.billingAddress.setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    }
    else{
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }


  onSubmit(){
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('customer').value);
  }

  handleMonthsAndYears(){

    const creditCardFormGroup = this.checkoutFormGroup.get('creditCard');

    const currentYear : number = new Date().getFullYear();
    const selectedYear : number = Number(creditCardFormGroup.value.expirationYear);


    let startMonth : number;

    if (currentYear == selectedYear) {

      startMonth = new Date().getMonth() + 1;

    } else {

      startMonth = 1; 

    }

    this.gothamNetworkFormService.getCreditCardMonths(startMonth).subscribe(
      data => {
        console.log("Retrieving credit card months: " + JSON.stringify(data));
        this.creditCardMonths = data;
      }
    )

  }

}
