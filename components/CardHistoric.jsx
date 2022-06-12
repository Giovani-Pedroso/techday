import {useState, useContext} from 'react';
import Router from 'next/router';

import {CartContext} from '../context/ContextCarrinho/index.js';

import {AiOutlineShoppingCart,
        AiOutlineArrowDown,
        AiOutlineArrowUp,
        AiOutlineCloseCircle} from 'react-icons/ai';

export default function CardHistoric({deleteHistoric, date, items, total}){


    const [show, setShow] = useState(false);
    const {handleItems} = useContext(CartContext); 

    const context = useContext(CartContext);
    const newDate = new Date(date);
    const dateOfSave = ` ${newDate.getDate()}/${newDate.getMonth()+1}/${newDate.getFullYear()} `;

    const handleCart = ()=>{
        console.log("carrilho");
        console.log("items carrilho", items);
        console.log(context);
        handleItems(items);
        Router.push('./cart');
        
    };

    const handleDelete = ()=>{
        console.log("delete");
    };

    const showProducts = () =>{

        setShow(!show);
        console.log("oi");
    };
    
    return(
        <div className="flex flex-col border-b-2">
        <div className="flex flex-row p-2 px-4  items-center h-[100px] justify-between">
          <div>
            {dateOfSave}
          </div>
          <div>
            <button
              className="flex flex-row  items-center p-4"
              onClick={showProducts}>
              Produtos: {items.length}
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
        { show &&
          <div>
            {items.map(item=>{
                return(
                    <div className=" flex justify-between border-t-2 border-dashed p-4">
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
