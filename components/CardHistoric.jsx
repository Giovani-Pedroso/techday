import {useState, useEffect, useContext} from 'react';
import Router from 'next/router';

import {CartContext} from '../context/ContextCarrinho/index.js';

import {AiOutlineShoppingCart,
        AiOutlineArrowDown,
        AiOutlineArrowUp,
        AiOutlineCloseCircle} from 'react-icons/ai';

export default function CardHistoric({deleteHistoric,id, date, items, total}){

    const [show, setShow] = useState(false);
    const [dateFormat, setDateFormat] = useState("");
    const {handleItems, setCartId} = useContext(CartContext); 

    console.log("id: ", id);
    
    const newDate = new Date(date);
    //save in the us format
    let dateOfSave = ` ${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()} `;


    
    const {handleItem} = useContext(CartContext); 

    //This section control the language of the component
    const defaultLanguage = {
        products:"Products",
        money:"$"
    };

    const [languageSite, setLanguageSite] = useState(defaultLanguage);

    
    useEffect(()=>{

        const navLanguage = navigator.language;
        if(navLanguage == "pt-BR" || navLanguage == "pt-PT"){


            setDateFormat(`${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()} `);
            setLanguageSite({
                products:"Produtos",
            });
            
        }
        else setDateFormat(` ${newDate.getMonth()+1}/${newDate.getDate()}/${newDate.getFullYear()} `);
        
    },[]);
    
    
    const handleCart = ()=>{
      //salva os itens do historico no context
      //e vai para apagina do carrinho
      //----------------------------------
      //save history items in context and go to cart page
        handleItems(items);
        setCartId(id);
      Router.push('./cart');
    };

    //mostra os produtos que foram salvos no carrinho
    //----------------------------------------
    //shows the products that have been saved in the cart

    const showProducts = () =>{
        setShow(!show);
    };
    
    return(
        <div className="flex flex-col border-b-2">
        <div className="flex flex-row p-2 px-4  items-center h-[100px] justify-between">
          <div>
            {dateFormat}
          </div>
          <div>
            <button
              className="flex flex-row  items-center p-4"
              onClick={showProducts}>
              {languageSite.products}: {items.length}
              { !show ? <AiOutlineArrowDown className="ml-[10px]"/>
                :<AiOutlineArrowUp className="ml-[10px]"/>}

            </button>
          </div>
          
          <div>
              R$ {total}
        </div>
          <div className="flex items-center text-2xl flex-row">
            <button onClick={handleCart}>
              <AiOutlineShoppingCart className="text-blue-700 mr-[10px]"/>
            </button>
            <button onClick={deleteHistoric}>
              
              <AiOutlineCloseCircle className="text-red-700"/>
            </button>
          </div>
        </div>
        { 
          //renderiza od produtos do carrinho
          //-----------------------
          //render the cart products
        show &&
          <div>
            {items.map(item=>{
                return(
                    <div key={item.productName} className=" flex justify-between border-t-2 border-dashed p-4">
                      <div >{item.productName}</div>
                      <div>
                        <div className="text-blue-700">Qtn:{item.quantity}</div>
                      </div>
                    </div>
                );
            })}
          </div>
        }
        </div>
    );
}
