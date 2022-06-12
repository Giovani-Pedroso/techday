import {useEffect, useState, useContext} from 'react';

import Link from 'next/link';

import {AiOutlineWhatsApp,
        AiOutlineSave,
        AiOutlineCopy,
        AiOutlineArrowLeft} from 'react-icons/ai';

import {CartContext} from '../context/ContextCarrinho/index.js';

import Logo from '../components/Logo.jsx';
import Navbar from '../components/Navbar1.jsx';
import CardProductsCart from '../components/CardProductCart.jsx';
//const itensTest = { "Óleo de Soja Liza 900ml": 3, "Extrato de Tomate Pomarola 320 g": 3 };

export default function Cart(){

    const {cartItems } = useContext(CartContext);
    const [itemsValue, setItemsValue] = useState({});
    const [messageWhatsapp, setMessageWhatsapp] = useState();

    const getTotal =()=>{
        const total=0;

        cartItems.map(item=>{
            total+= item.price * item.quantity;
           
        });
        return total.toFixed(2);
    };

    const saveCart = () =>{
        const total = getTotal();
        
        if(total==0){
            alert("não há items para salvar");
            return 0;
        }
        const storedData = JSON.parse(localStorage.getItem("historic"));
        const date = new Date(Date.now());
        let dataToSave;
        const newData = {date, items:cartItems, totalPrice:total};
   
        if(storedData==null) dataToSave = JSON.stringify([newData]);
        else {
            storedData.push(newData);
            dataToSave = JSON.stringify(storedData);
        }
        //console.log(JSON.parse(dataToSave));
        localStorage.setItem("historic", dataToSave);

        
        alert("a list foi salva");
        return 0;
    };

    const getMessage = () =>{
        
        const total = getTotal();
        if(total==0){
            alert("nao há items para copiar");
            return 0;
        }
        let message ="";
        cartItems.map(item=> message+=`${item.productName} X ${item.quantity}\n`);
        message +=`\nTotal: R$ ${total}`;
        console.log(message);
        navigator.clipboard.writeText(message);
        alert("Lista copiada para a area de transferencia");
        return 0;
    };
    
    //console.log("itesn do carrinho", cartItems);
    //console.log(obj2Array(itensTest));
    return (
        <div className="flex flex-col m-0 p-0">


          <Navbar isCart={true}/>
          <div className="h-full">
            {
              
                cartItems.map(item=>{
                    if(item.quantity){
                        //console.log(messageTpm);
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
          </div>
          
          <footer className="flex flex-col w-[100vw] fixed inset-x-0 bottom-0 bg-blue-700 text-white p-[6px]">
            <div className="flex flex-rol justify-between">
              <p>
                Total: 
              </p>
              <div>
                R$ {getTotal()}
              </div>
            </div>
            
            <div className="flex flex-rol mt-[10px] ">
              <button className="flex justify-center items-center w-[50%] h-[40px] bg-red-500 active:bg-red-300" onClick={()=>saveCart()}>
                <AiOutlineSave className="inline text-xl mr-[10px]" />
                <span>Salvar a lista</span>
              </button>
              <button onClick={()=>getMessage()} className="flex justify-center items-center w-[50%] h-[40px] bg-green-700 active:bg-green-500">

                <AiOutlineCopy className="inline align-middle inline text-xl mr-[10px] "/>
                <span className="align-top ">Copiar lista</span>

              </button>
            </div>
          </footer>
        </div>
    );
}

/*
Açúcar Refinado União 1Kg X 3
Batata Monalisa Aprox. 1 Kg X 3
Molho de Tomate Tradicional Tarantella Sachê 300 g X 6
Óleo de Soja Liza 900ml X 3

Total: R$ 70.95

 */

