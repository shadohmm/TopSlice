import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  orderSummary = {
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 12.00 },
      { name: 'Garlic Bread', quantity: 1, price: 5.00 }
    ]
  };

  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern('^[0-9]{5}$')]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      paymentMethod: ['Credit Card', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expiry: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]]
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      // Handle the form submission
      console.log('Order submitted:', this.checkoutForm.value);
    }
  }

  get totalAmount() {
    const subtotal = this.orderSummary.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryFee = 3.00;
    const tax = subtotal * 0.1; // 10% tax
    return subtotal + deliveryFee + tax;
  }

}
