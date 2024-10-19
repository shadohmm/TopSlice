import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddressDetails } from 'src/app/models/user';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  userId = localStorage.getItem('userId');
  orderSummary = {
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 12.00 },
      { name: 'Garlic Bread', quantity: 1, price: 5.00 }
    ]
  };

  constructor(private fb: FormBuilder, private routesService: RoutesService) {
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

  ngOnInit(): void {
    this.routesService.getOrders(this.userId)
    .subscribe({
      next: (data: any) => {
        const checkoutAddressDetails = data.checkoutDetails;
        console.log('Address Detailss:', checkoutAddressDetails);
        if (checkoutAddressDetails) {
          this.checkoutForm.patchValue({
            name: checkoutAddressDetails.name,
            address: checkoutAddressDetails.address,
            city: checkoutAddressDetails.city,
            state: checkoutAddressDetails.state,
            zip: checkoutAddressDetails.zip,
            phone: checkoutAddressDetails.phone
          });
        }
      },
      error: (err) => {
        console.error('Error fetching address details:', err);
      }
    });
  }

  onSubmit() {
    if (this.checkoutForm.valid) {
      
      if (!this.userId) {
        console.error('User ID not found in localStorage');
        alert('User ID not found. Please log in.');
        return;
      }
  
      // Handle the form submission
      let checkoutAddressDetails: AddressDetails;
      checkoutAddressDetails = {
        userId: this.userId,
        name: this.checkoutForm.value.name,
        address: this.checkoutForm.value.address,
        city: this.checkoutForm.value.city,
        state: this.checkoutForm.value.state,
        zip: this.checkoutForm.value.zip,
        phone: this.checkoutForm.value.phone,
      };

      this.routesService.placeOrder(checkoutAddressDetails).subscribe({
        next: (data) => {
          console.log('Order placed:', data);
          alert('Order placed successfully!');
        },
        error: (err) => {
          console.error('Error placing order:', err);
          alert('Error placing order. Please try again.');
        }
      });

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
