import {useEffect, useState, useContext} from 'react';

import Link from 'next/link';

import {AiOutlineWhatsApp,
        AiOutlineSave,
       AiOutlineArrowLeft} from 'react-icons/ai';

import {CartContext} from '../context/ContextCarrinho/index.js';

import Logo from '../components/Logo.jsx';

import CardProductsCart from '../components/CardProductCart.jsx';
//const itensTest = { "Óleo de Soja Liza 900ml": 3, "Extrato de Tomate Pomarola 320 g": 3 };

export default function Cart(){

    const {cartItems } = useContext(CartContext);
    const [itemsValue, setItemsValue] = useState({});


    const getTotal =()=>{
        const total=0;

        cartItems.map(item=>{
            total+= item.price * item.quantity;
           
        });
        return total.toFixed(2);
    };
    
    console.log("itesn do carrinho", cartItems);
    //console.log(obj2Array(itensTest));
    return (
        <div className="flex flex-col m-0 p-0">

          <nav className="flex flex-row text-white items-center p-[20px] bg-blue-700 sticky top-0 left-0 md:static">
            <div className="mr-[40px]">
              <Link href="./">
                <AiOutlineArrowLeft className="text-3xl cursor-pointer"/>
              </Link>
            </div>
            <Logo/>
            <div className="w-[10px]">
            </div>
          </nav>
          
          {
          
              cartItems.map(item=>{
                  if(item.quantity){
                  return(
                      <CardProductsCart image={item.image}
                                        key={item.productName}
                                        productName={item.productName}
                                        quantity={item.quantity}
                                        price={item.price}
                      />
                  );
                  }
                  return null;
              })
          }
          <footer className="flex flex-col w-full sticky bottom-0 bg-blue-700 text-white p-[6px]">
            <div className="flex flex-rol justify-between">
              <p>
                Total: 
              </p>
              <div>
                R$ {getTotal()}
              </div>
            </div>
            
            <div className="flex flex-rol mt-[10px] ">
              <button className="flex justify-center items-center w-[50%] h-[40px] bg-red-500 active:bg-red-300" onClick={()=>console.log("valores itens ",cartItems)}>
                <AiOutlineSave className="inline text-xl mr-[10px]" />
                <span>Salvar a lista</span>
              </button>
              <button className="flex justify-center items-center w-[50%] h-[40px] bg-green-700 active:bg-green-500">
                <AiOutlineWhatsApp className="inline align-middle inline text-xl mr-[10px] "/>
                <span className="align-top ">Enviar a lista</span>
              </button>
            </div>
          </footer>
        </div>
    );
}

