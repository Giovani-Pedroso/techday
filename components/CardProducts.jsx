import {useState, useContext} from 'react';

import {CartContext} from '../context/ContextCarrinho/index.js';

export default function CardProducts({price, product, image}){

    const [quantity, setQuantity] = useState(0);

    return(
        <div className=" flex flex-col h-full rounded-sm p-2 justify-between border-[2px] border-[#ddd] ">

          <div>
          <img className="max-h-[175px]" src={image}/>
            <p className="mb-[20px]">{product}</p>
          </div>
          <div>
          <p className="text-blue-700 p-1 font-bold mb-[10px]">R${price}</p>
          <div className="flex flex-col w-full" >

            {/*
              se a quantidade de produtos for zero mostrará um botão perguntando
              para adicionar o produto no carrinho, se não vai mostrar a entrada onde
              o usuário pode selecionar quantos produtos deseja
              -----------------------------------------------------------
              if the amount of products is zero, it will show a button asking
              to add the product to the cart, otherwise it will show the entry where
              the user can select how many products them wants
            */}
            {quantity == 0 ? <ButtonAddCart productName={product}
                                              price={price}
                                              image={image}
                                              on={()=>setQuantity(1)}/> :
             <InputQuantity setQuantidate={setQuantity}
                            productName={product}
                            image={image}
                            price={price}
                            quantity={quantity}/>
            }
            
          </div>
          </div>
        </div>
    );
}

const ButtonAddCart = ({on, productName, image, price})=>{

    const {handleItem} = useContext(CartContext); 

    return(
        <button type="button" onClick={()=>{
          //salva o produto no contexto
          //------------------------------
          //save the product in the context
            handleItem({productName,image, quantity:1 ,price});
            on();

        }} className="bg-blue-700 h-[50px] p-2 text-white">Adicionar</button>
    );
};

const InputQuantity = ({quantity, image,setQuantidate, productName, price}) =>{

   
    const {handleItem} = useContext(CartContext);    
    
    return(
        <div className="flex flex-rol border-2 border-blue-700 justify-between">
          <button className="bg-blue-700 cursor-pointer w-[50px] text-4xl item-center text-center text-white h-[50px]"
             onClick={()=>{
                //salva o produto no contexto, mas se a quantidade for zero 
                //não fará nada
                //------------------------------
                //save the product in the context, but if the quantity were
                //it won't do nothing
                 setQuantidate(quantity - 1);
                 handleItem({productName, image, quantity:quantity-1 ,price});
             }}>
            -
          </button>
          <p className="align-middle inline-block text-xl p-2">
            {quantity}
        </p>
          <button className="bg-blue-700 cursor-pointer w-[50px] text-4xl item-center text-center text-white h-[50px]"
             onClick={()=>{
                 setQuantidate(quantity +1);
                 handleItem({productName,image, quantity:quantity+1 ,price});
             }}>
            +
          </button>
        </div>
    );
};

