import { Component } from '@angular/core';
import { CartItem } from 'src/app/models/cartItem';
import { CustomPizza } from 'src/app/models/constants';
import { Pizza } from 'src/app/models/pizza';
import { AuthService } from 'src/app/services/auth.service';
import { IngredientsService } from 'src/app/services/ingredients.service';
import { RoutesService } from 'src/app/services/routes.service';


@Component({
  selector: 'app-customized-pizza',
  templateUrl: './customized-pizza.component.html',
  styleUrls: ['./customized-pizza.component.css']
})
export class CustomizedPizzaComponent {
  ingredients:any;
  selectedIngredient = false;
  customPizzaName:string = ''
  userId = localStorage.getItem('userId');
  constructor(private authService: AuthService,private ingredieantService:IngredientsService, private routeService : RoutesService) {
    // this.ingredients = this.ingredieantService.getIngredients();
    // console.log(this.ingredients);
    this.routeService.getIngredients().subscribe((data)=>{
      this.ingredients = data;
      console.log("api ingredients",data);
    });
  }

  selectedIngredients: any[] = [];
  totalPrice:number = 0;

  onCheckboxChange(event: any, ingredient: any) {
    console.log(event);
    
    if (event.target.checked) {
      this.selectedIngredients.push(ingredient);
      this.totalPrice += ingredient.price;
    } else {
      const index = this.selectedIngredients.indexOf(ingredient);
      if (index > -1) {
        this.selectedIngredients.splice(index, 1);
        this.totalPrice -= ingredient.price;
      }
    }
  }


  
  addToCart(){
    console.log("selected",this.selectedIngredients);
    console.log(this.totalPrice);
    let cartItem : CartItem;
    const random = Math.floor(Math.random() * 1000);
    console.log("----------",random);
    // const userId = this.authService.getUserId();
    if(!this.userId){
      alert('Please login to add pizza to cart');
      return;
    }
    cartItem = {
      userId: this.userId,
      pizzaId: random.toString(),
      pizzaName: this.customPizzaName || CustomPizza.pizzaName,
      pizzaPrice: this.totalPrice,
      pizzaImage: CustomPizza.pizzaImage,
      pizzaQuantity: 1,
      pizzaDescription: CustomPizza.pizzaDescription
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
