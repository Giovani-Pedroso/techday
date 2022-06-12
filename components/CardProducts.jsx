import {useState, useContext} from 'react';

//import of the context
import {CartContext} from '../context/ContextCarrinho/index.js';


import Aviso from './Aviso.jsx';

export default function CardProducts({price, product, image}){

    const [openAviso, setOpenAviso] = useState(false);
    const [quantidade, setQuantidate] = useState(0);
    const [messageAviso, setMessageAviso] = useState("");

    const {cartItems, setCarItems} = useContext(CartContext);
    /*
    const handleSubmit = (e) =>{

        e.preventDefault();
        
        if(quantidade > 0) setMessageAviso(`${quantidade} de ${product} foi adicionado(a) ao carinho`);
        if(quantidade == 0) setMessageAviso(`o produto ${product} foi removido`);
        else setMessageAviso("Valor invalido");
            
        setOpenAviso(true);
        console.log("aviso"); 

        
    };
    const getAviso = () =>{
        if(aviso>0) return  <Aviso text="ola"/>; 
        return 0;
    };
   */ 
    return(
        <div className=" flex flex-col h-full rounded-sm p-2 justify-between border-[2px] border-[#ddd] ">

          <div>
          <img className="max-h-[175px]" src={image}/>
            <p className="mb-[20px]">{product}</p>
          </div>
          <div>
          <p className="text-blue-700 p-1 font-bold mb-[10px]">R${price}</p>
          <div className="flex flex-col w-full" >
            {/*       <input className="border-2 p-2 focus:outline-none border-blue-700 w-full"
                   value={quantidade}
                   onChange={e=>setQuantidate(e.target.value)}
                   placeholder="quantidade"
                   type="number"/>
             */}
            {quantidade == 0 ? <ButtonAddCart productName={product}
                                              price={price}
                                              image={image}
                                              on={()=>setQuantidate(1)}/> :
             <InputQuantity setQuantidate={setQuantidate}
                            productName={product}
                            image={image}
                            price={price}
                            quantity={quantidade}/>
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

//
//          <img src="https://carrefourbr.vteximg.com.br/arquivos/ids/14648737/batata-monalisa-carrefour-600-g-1.jpg?v=637511892564730000"/>
