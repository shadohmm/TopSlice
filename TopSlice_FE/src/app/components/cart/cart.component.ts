import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cartItem';
import { AuthService } from 'src/app/services/auth.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

//for now we are using the ingrediants, in real we will use the api from BE to get the cart items
  userCartItems:CartItem[] = [];
  totalPrice:number = 0;

  constructor(private authService: AuthService,private routeService : RoutesService, private router: Router) { }

  ngOnInit(): void {
    // const userId = this.authService.getUserId();
    const userId = localStorage.getItem('userId');
    console.log("userId cart",userId);
    if (userId) {
      this.routeService.getShopingCartItems(userId).subscribe({
        next: (data:any) => {
          console.log("data", data);
          const cartItems = data.cartItems;
          // Store the fetched data in userCartItems and add the selected property
          this.userCartItems = cartItems.map((item: any) => ({
            ...item,
            totalPizzaPrice: item.pizzaPrice * item.pizzaQuantity,
            selected: item.isSelected ??false})); 
          console.log("data", data.cartItems);
          console.log("cartDATA", this.userCartItems);
          
        },
        error: (err) => {
          console.error('Error while fetching cart items:', err);
        }
      });
    }else {
      console.log('User ID not found in localstorage');
    }
  }

  onCheckboxChange(event: any, cartItem: any) {
    try {
      cartItem.selected = event.target.checked;

      if (cartItem.selected) {
        this.totalPrice += cartItem.totalPizzaPrice;
      } else {
        this.totalPrice -= cartItem.totalPizzaPrice;
      }

      
    } catch (error) {
      console.error('Error updating cart item:', error);
      
    }
    // if (event.target.checked) {
    //   this.totalPrice += cartItem.pizzaPrice;
    // } else {
    //   this.totalPrice -= cartItem.pizzaPrice;
    // }
  }

  //for increasing adn decreasing hte queantity etter to remove the  selection check ox and 
  //jsut let the incr/dec along with delete option 
  
  increaseQuantity(cartItem: any): void {
    // cartItem.pizzaQuantity++;
    // cartItem.pizzaPrice = cartItem.pizzaPrice / (cartItem.pizzaQuantity - 1) * cartItem.pizzaQuantity;
    // this.totalPrice = cartItem.pizzaPrice;
    try {
      cartItem.pizzaQuantity++;
      cartItem.totalPizzaPrice += cartItem.pizzaPrice;
      if (cartItem.selected) {
        this.totalPrice += cartItem.pizzaPrice;
      }
      
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  }

  decrementQuantity(cartItem: any): void {
    // if (cartItem.pizzaQuantity > 1) {
    //   cartItem.pizzaQuantity--;
    //   cartItem.pizzaPrice = cartItem.pizzaPrice / (cartItem.pizzaQuantity + 1) * cartItem.pizzaQuantity;
    //   // this.totalPrice -= cartItem.pizzaPrice;
    // }

    try {
      if (cartItem.pizzaQuantity > 1) {
        cartItem.pizzaQuantity--;
        cartItem.totalPizzaPrice -= cartItem.pizzaPrice;
        if (cartItem.selected) {
          this.totalPrice -= cartItem.pizzaPrice;
        }
      }
      
    } catch (error) {
      console.error('Error updating cart item:', error);
      
    }
  }

  deleteItem(userId:String,cardItem:CartItem) {
    const pizzaId = cardItem.pizzaId;
    // const pizzaPrice:number = cardItem.pizzaPrice;
    // const cartData = { userId, pizzaId };
    // this.routeService.removeCartItem(cartData).subscribe({  
    //   next: (data) => {
    //     console.log("item removed", data);
    //     this.userCartItems = this.userCartItems.filter((item) => item.pizzaId !== pizzaId);
    //     this.totalPrice -= pizzaPrice; 
    //   }
    // });
    // console.log("delete item");
    const cartData = { userId, pizzaId };
    this.routeService.removeCartItem(cartData).subscribe({
      next: (data) => {
        console.log("item removed", data);
        // Remove the item from the local array
        this.userCartItems = this.userCartItems.filter(item => item.pizzaId !== pizzaId);
        // Recalculate the total price
        this.calculateTotalPrice(cardItem.totalPizzaPrice);
      },
      error: (err) => {
        console.error('Error deleting item:', err);
      }
    });
    console.log("delete item");

  }
  
  calculateTotalPrice(price:any): void {
    this.totalPrice -= price;
  }
  placeOrder(){
    // console.log(this.totalPrice);
    // this.routeService.getPizza().subscribe((data)=>{
    //   console.log(data);
    // });
    this.router.navigate(['/checkout']);
  }

}
