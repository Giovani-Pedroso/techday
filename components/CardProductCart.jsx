import {useState, useContext} from 'react';

import {CartContext} from '../context/ContextCarrinho/index.js';

import place from '../public/placeHolder.png';

export default function CardProductsCart({image, productName, price, quantity}){

    const [totalPrice, setTotalPrice] = useState((price*quantity).toFixed(2));  
    const [quantidade, setQuantidate] = useState(quantity);

    const {handleItem} = useContext(CartContext);
    const item = {image, productName, quantity, price};


    
    const handleQuantity = (qtn) =>{
        setQuantidate(qtn);
        setTotalPrice((qtn*price).toFixed(2));

    };
    
    return(
        <div className="w-full flex flex-col border-b-2 px-[20px]">
          <div className="flex flex-rol items-center">

            <img src={item.image}
                 className="w-[100px] mr-[40px]"
            />
            <p>{item.productName}</p>
          </div>
          <div>
            <div className="flex flex-rol px-4 py-2 items-center justify-between">
              <div>
                R$ {item.price.toFixed(2)}
              </div>
              <InputQuantity                         
                             item={item}
                             onQuantity={handleItem}
                             setQuantidate={handleQuantity}/>
              <div className="w-[76px] text-blue-700 font-bold">
              R$ {totalPrice}
              </div>
            </div>
          </div>
        </div>
    );
}



const InputQuantity = ({item, onQuantity, setQuantidate, setCarItems, productName, price}) =>{
   
    return(
        <div className="flex flex-rol w-[30%] justify-between border-2 border-blue-700">
          <button className=" flex bg-blue-700 cursor-pointer w-[30px] text-2xl item-center justify-center text-white h-[30px]"
             onClick={()=>{
                 if(item.quantity>0){
                     setQuantidate(item.quantity-1);
                     onQuantity({...item, quantity:item.quantity-1});
                 };
             }}
             >
            -
          </button>
          <p className="flex items-center justify-center inline-block h-[30px] text p-2">
            {item.quantity}
          </p>
          <button className="bg-blue-700 cursor-pointer w-[30px] text-2xl item-center text-center text-white h-[30px] "
             onClick={()=>{
                 if(item.quantity<99){
                     setQuantidate(item.quantity+1);
                     onQuantity({...item, quantity:item.quantity+1});
                 };
             }}
            >
      +
          </button>
        </div>
    );
};
