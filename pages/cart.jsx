import {useContext} from 'react';

import {
        AiOutlineSave,
        AiOutlineCopy,
    } from 'react-icons/ai';

import {CartContext} from '../context/ContextCarrinho/index.js';

import Navbar from '../components/Navbar1.jsx';
import CardProductsCart from '../components/CardProductCart.jsx';

export default function Cart(){

    const {cartItems } = useContext(CartContext);

    //função que retorna a soma de todos os preços
    //---------------------------------------
    //function that return the sum of all prices
    const getTotal =()=>{
        const total=0;
        cartItems.map(item=>{
            total+= item.price * item.quantity;
           
        });
        return total.toFixed(2);
    };

    const saveCart = () =>{
        const total = getTotal();
        
        //se não houver itens não fara nada
        //-----------------------------------
        //if there is no item won't do nothing
        if(total==0){
            alert("não há items para salvar");
            return 0;
        }

        //pega os dados que foram salvos e os coloca em 
        //uma variavel
        //------------------------------------------
        //take the data that was stored then put them into a variable
        const storedData = JSON.parse(localStorage.getItem("historic"));

        //salva a data atual
        //------------------
        //save the actual date
        const date = new Date(Date.now());
        let dataToSave;

        //junta os dois dados
        //--------------------
        //join the 2 datas
        const newData = {date, items:cartItems, totalPrice:total};
   
        //converte os datos para serem salvos
        //---------------------------------
        //convert the data to but save
        if(storedData==null) dataToSave = JSON.stringify([newData]);
        else {
            storedData.push(newData);
            dataToSave = JSON.stringify(storedData);
        }
        
        //salva os dados no armazenamento local
        //-----------------------------
        //save the data in the local storage
        localStorage.setItem("historic", dataToSave);

        //the list was saved - pr-br
        alert("a list foi salva");
        return 0;
    };

    const getMessage = () =>{
        
        const total = getTotal();
        if(total==0){
            //there is nothing to copy - pt-br
            alert("nao há items para copiar");
            return 0;
        }
        let message ="";

        //adiciona os itens do carrinho na menssagem
        //----------------------------------------
        //add the cart items in the message
        cartItems.map(item=> message +=`${item.productName} X ${item.quantity}\n`);
        message +=`\nTotal: R$ ${total}`;
        //console.log(message);

        //coloca a menssagem co Ctrl-v
        //-----------------------------
        //put the message in the Ctrl-v
        navigator.clipboard.writeText(message);

        //the list was cpoy to the clipboard - pt-br
        alert("Lista copiada para a area de transferencia");
        return 0;
    };
    
    return (
        <div className="flex flex-col m-0 p-0">


          <Navbar isCart={true}/>
          <div className="h-full mb-[108px]">
            {
              /*
                renderiza os itens do carrinho
                ------------------------------
                render the cart's itens
            */
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
          
          <footer className="flex flex-col w-[100vw] fixed inset-x-0 bottom-0 bg-blue-700 text-white py-[6px] px-[26px]">
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


