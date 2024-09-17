import { Component } from '@angular/core';
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

  constructor(private ingredieantService:IngredientsService, private routeService : RoutesService) {
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
    console.log(this.totalPrice);
  }
  

}
