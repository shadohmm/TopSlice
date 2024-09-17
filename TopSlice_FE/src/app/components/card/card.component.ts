import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { Pizza } from 'src/app/models/pizza';
import { PizzaService } from 'src/app/services/pizza.service';
import { RoutesService } from 'src/app/services/routes.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  Pizzas:Pizza[] = [];
  // pizza:any;
  isPopupVisible = false;
  pizzaIngre : string[] = [];
  ingrediants : string[] = [];
  
constructor(private routeService:RoutesService) {
  this.routeService.getPizza().subscribe((data)=>{
    this.Pizzas = data;
    console.log(data);
  });
 }

 openPopup(pizza:Pizza){ 
  this.ingrediants = pizza.ingredients;
  this.isPopupVisible = true;
 }

 addTOCart(pizza:Pizza){
  let cartItem : CartItem;
  cartItem = {
    userId: '1',
    pizzaId: pizza.id.toString(),
    pizzaName: pizza.name,
    pizzaPrice: pizza.price,
    pizzaImage: pizza.image,
    pizzaQuantity: 1,
    pizzaDescription: pizza.description
  }
  console.log("add to cart",cartItem);
  // pizza.pizzaQuantity = 1;
  // pizza.userId = 1;
   this.routeService.addToCart(cartItem).subscribe({
    next: (data) =>{
      console.log(data);
      alert('Pizza added to cart');
    },
    error: (error) =>{
      console.log("error in adding the pizza",error);
      alert('Error in adding the pizza');
    }

   });
 }
  
}