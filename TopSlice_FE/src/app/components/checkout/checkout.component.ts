import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem';
import { AddressDetails } from 'src/app/models/user';
import { CartService } from 'src/app/services/cart.service';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  checkoutForm: FormGroup;
  cartItems: CartItem[] = []
  userId = localStorage.getItem('userId');
  pizzaIds:String[] = []
  // orderSummary = {
  //   items: [
  //     { name: 'Margherita Pizza', quantity: 1, price: 12.00 },
  //     { name: 'Garlic Bread', quantity: 1, price: 5.00 }
  //   ]
  // };

  constructor(private fb: FormBuilder, private routesService: RoutesService, private cartService: CartService, private router: Router) {
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
    this.cartItems = this.cartService.getCheckoutItems()
    this.pizzaIds = this.cartItems.map(item => item.pizzaId)
    console.log("cartItemCheckout",this.cartItems)
    console.log("pizzaids", this.pizzaIds)
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
          let userId = this.userId
          let pizzaIds = this.pizzaIds
          const cartData = { userId, pizzaIds };
          console.log('Order placed:', data);
          this.routesService.removeCartItem(cartData).subscribe({
            next:(data)=>{
              console.log(data)
            }
          })
          alert('Order placed successfully!');
          this.router.navigate(['/home']);
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
    const subtotal = this.cartItems.reduce((acc, item) => acc + item.pizzaPrice * item.pizzaQuantity, 0);
    const deliveryFee = 3.00;
    const tax = subtotal * 0.1; // 10% tax
    return subtotal + deliveryFee + tax;
  }

}
