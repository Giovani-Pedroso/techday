import {useEffect, useState, useContext} from 'react';

import {CartContext} from '../context/ContextCarrinho/index.js';

import CardProductsCart from '../components/CardProductCart.jsx';
//const itensTest = { "Óleo de Soja Liza 900ml": 3, "Extrato de Tomate Pomarola 320 g": 3 };

export default function Cart(){

    const {cartItems, } = useContext(CartContext);

    console.log(cartItems);
    //console.log(obj2Array(itensTest));
    return (
        <div>

          {
              cartItems.map(item=>{
                  return(
                      <CardProductsCart image={item.image}
                                        name={item.productName}
                                        quantity={item.quantity}
                                        price={item.price}
                      />
                  );
              })
          }
        </div>
    );
}
