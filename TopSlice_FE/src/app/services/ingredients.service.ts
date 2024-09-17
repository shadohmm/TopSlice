import { Injectable } from '@angular/core';
import { Ingrediants } from '../../assets/ingridient';
@Injectable({
  providedIn: 'root'
})
export class IngredientsService {

  constructor() { }
  getIngredients() {
    return Ingrediants;
  }
}
