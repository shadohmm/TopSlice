import { Injectable } from '@angular/core';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  checkoutItemsFromCart:CartItem[]=[];
  
  setChekoutItem(items:CartItem[]){
    this.checkoutItemsFromCart = items
  }

  getCheckoutItems(){
    return this.checkoutItemsFromCart;
  }

  constructor() { }
}
