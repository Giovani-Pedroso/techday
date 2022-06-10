import {useState} from 'react';

import place from '../public/placeHolder.png';

export default function CardProductsCart({image, name, price, quantity}){

    const [totalPrice, setTotalPrice] = useState(price*quantity);  
    const [quantidade, setQuantidate] = useState(quantity);

    const handleQuantity = (qtn) =>{
        setQuantidate(qtn);
        setTotalPrice((qtn*price).toFixed(2));

    };
    
    return(
        <div className="w-full flex flex-col border-b-2 px-[20px]">
          <div className="flex flex-rol items-center">

            <img src={image}
                 className="w-[100px] mr-[40px]"
            />
            <p>{name}</p>
          </div>
          <div>
            <div className="flex flex-rol px-4 py-2 items-center justify-between">
              <div>
                R$ {price.toFixed(2)}
              </div>
              <InputQuantity quantity={quantidade}
                             setQuantidate={handleQuantity}/>
              <div className="text-blue-700 font-bold">
              R$ {totalPrice}
              </div>
            </div>
          </div>
        </div>
    );
}



const InputQuantity = ({quantity, setQuantidate, productName, price}) =>{

    return(
        <div className="flex flex-rol w-[30%] justify-between border-2 border-blue-700">
          <a className="bg-blue-700 cursor-pointer w-[30px] text-2xl item-center text-center text-white h-[30px]"
             onClick={()=>{
                 if(quantity>0)setQuantidate(quantity-1);}}
             >
            -
          </a>
          <p className="align-middle inline-block h-[30px] text p-2">
            {quantity}
          </p>
          <a className="bg-blue-700 cursor-pointer w-[30px] text-2xl item-center text-center text-white h-[30px]"
             onClick={()=>{
                 if(quantity<99)setQuantidate(quantity+1);}}
            >
      +
          </a>
        </div>
    );
};
