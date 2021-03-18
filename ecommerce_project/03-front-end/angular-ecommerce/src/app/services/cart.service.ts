import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];

  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);

  constructor() { }

  addToCart(theCartItem: CartItem){

    let alreadyExistsInCart: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0){
      
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id == theCartItem.id);
      alreadyExistsInCart = (existingCartItem != undefined);

    }

    if(alreadyExistsInCart){

      existingCartItem.quantity++;

    } else {

      this.cartItems.push(theCartItem);

    }

    this.computeCartTotals();

  }

  computeCartTotals() {

    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    for(let currentCartItem of this.cartItems){

        totalPriceValue += (currentCartItem.quantity * currentCartItem.unitPrice);
        totalQuantityValue += currentCartItem.quantity;

    }

    //publish new values - all subscribers will recieve the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartDetails(totalPriceValue, totalQuantityValue);

  }
  logCartDetails(totalPriceValue: number, totalQuantityValue: number) {

    console.log("Contents of cart: ");

    for(let cartItem of this.cartItems){

        const subTotal = cartItem.quantity * cartItem.unitPrice;
        console.log(`Name: ${cartItem.name}\nPrice: ${cartItem.unitPrice}\nQuantity: ${cartItem.quantity}\nSubtotal: ${subTotal}`)

    }

    console.log(`Total quantity: ${totalQuantityValue}\nTotal price: R${totalPriceValue}`)
    console.log("----------------------------------------")
  }

  decrementQuantity(theCartItem: CartItem) {
    
    theCartItem.quantity--;

    if(theCartItem.quantity == 0){

      this.remove(theCartItem);

    }

    else{

      this.computeCartTotals();

    }

  }

  remove(theCartItem: CartItem) {

    const itemIndex = this.cartItems.findIndex( tempCartItem => tempCartItem.id == theCartItem.id );

    if(itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
    }

  }

}
