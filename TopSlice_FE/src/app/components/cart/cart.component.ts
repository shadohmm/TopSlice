import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
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
  constructor(private routeService : RoutesService) { }

  ngOnInit(): void {
    this.routeService.getShopingCartItems('1').subscribe({
      next: (data:any) => {
        console.log("data", data.cartItems);
        this.userCartItems = data.cartItems; // Store the fetched data in userCartItems
        console.log("cartDATA", this.userCartItems);
        
      },
      error: (err) => {
        console.error('Error fetching cart items:', err);
      }
    });
  }

  onCheckboxChange(event: any, cartItem: any) {
    if (event.target.checked) {
      this.totalPrice += cartItem.pizzaPrice;
    } else {
      this.totalPrice -= cartItem.pizzaPrice;
    }
  }

  //for increasing adn decreasing hte queantity etter to remove the  selection check ox and 
  //jsut let the incr/dec along with delete option 
  
  increaseQuantity(cartItem: any): void {
    cartItem.pizzaQuantity++;
    cartItem.pizzaPrice = cartItem.pizzaPrice / (cartItem.pizzaQuantity - 1) * cartItem.pizzaQuantity;
  }

  decrementQuantity(cartItem: any): void {
    if (cartItem.pizzaQuantity > 1) {
      cartItem.pizzaQuantity--;
      cartItem.pizzaPrice = cartItem.pizzaPrice / (cartItem.pizzaQuantity + 1) * cartItem.pizzaQuantity;
    }
  }

  deleteItem(userId:String,pizzaId :String) {
    const cartData = { userId, pizzaId };
    this.routeService.removeCartItem(cartData).subscribe({  
      next: (data) => {
        console.log("item removed", data);
      }
    });
    console.log("delete item");
  }
 
  placeOrder(){
    console.log(this.totalPrice);
    this.routeService.getPizza().subscribe((data)=>{
      console.log(data);
    });
  }

}
