import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment} from '../../enviroments/environment'
import { Observable } from 'rxjs';
import { Pizza } from '../models/pizza';

@Injectable({
  providedIn: 'root'
})
export class RoutesService {

  constructor(private http:HttpClient) { }

  getPizza():Observable<Pizza[]> {
    return this.http.get<Pizza[]>(`${environment.gateway}/getPizza`);
  }

  addPizza(pozzaData: any){
    return this.http.post(`${environment.gateway}/getPizza`,pozzaData);
  }

  getIngredients() {
    return this.http.get(`${environment.gateway}/getIngredients`);
  }

  addToCart(cartData: any){
    return this.http.post(`${environment.gateway}/addCartItem`,cartData);
  }

  updateCart(cartData: any){
    return this.http.post(`${environment.gateway}/updateCartItem`,cartData);
  }

  getShopingCartItems(userId: any){
    return this.http.get(`${environment.gateway}/getShopingCartItems/${userId}`);
  }

  removeCartItem(cartData: any){
    return this.http.post(`${environment.gateway}/removeCartItem`,cartData);
  }
}
