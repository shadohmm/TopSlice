import { Injectable } from '@angular/core';
import { Pizzas } from '../../assets/pizza';
@Injectable({
  providedIn: 'root'
})
export class PizzaService {

  

  constructor() { }
  getPizzas() {
    return Pizzas;
  }


}
