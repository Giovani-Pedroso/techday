import {useEffect, useState} from 'react';
import Link from 'next/link';

import {AiOutlineSearch,
        AiOutlineClose,
        AiOutlineShoppingCart} from 'react-icons/ai';

//component
import CardProducts from './CardProducts.jsx';
import Logo from './Logo.jsx';
//
const apiGetProduct = "https://mercado.carrefour.com.br/api/catalog_system/pub/products/search?fq=";

export default function SearchProducts({store, openModal}){

    const [productList, setProductsList] = useState([]);
    const [productSearch, setProductSearch] = useState("");
    const [inputValue, setInputValue] = useState("");
    //const [componentes] 
    
    useEffect(()=>{
        const getProducts = async ()=>{
            try{
                const product = await fetch(`${apiGetProduct}${store}`);
                const jsonProduct = await product.json();
                setProductsList(jsonProduct);
            }
            catch(err){console.log(err.message);};

        };
        getProducts();

    },[]);

    useEffect(()=>{
        
        
    },[]);

    const handleSubmit = (e) =>{
        setProductSearch(inputValue.toLowerCase());
        e.preventDefault();
    };
    
    return(
        <div className="flex flex-wrap w-[100%] justify-center ">
          <nav className="flex mb-[20px] w-[100vw] drop-shadow-2xl flex-col items-center justify-center  bg-blue-700 text-white w-full">
            <div className="flex justify-end mt-[10px] pr-3">
              <Link href="./cart" >
                <a className="text-3xl text-end">
                  
                  <AiOutlineShoppingCart/>
                </a>
              </Link>

          
            </div>
            <Logo/>
            <form
              onSubmit={handleSubmit}
              className="p-2 w-[80%] text-white bg-white my-4 border-2 flex justify-between">
              <input value={inputValue}
                     onChange={(e)=> setInputValue(e.target.value)}
                     className="text-black w-[90%] m-auto focus:outline-none"
                     placeholder="Produto"/>
              <button>
                <span className="text-2xl text-blue-700"><AiOutlineSearch/></span>
            </button>
            </form>
            
            <div className="mb-4">
              Loja {store} <button
                             className="text-red-400"
                             onClick={openModal}> Mude de loja</button>
            </div>
          </nav>
          {
              productList.filter(product=>{
                  const nameLowerCase = product.productName.toLowerCase();
                  const re = new RegExp(`${productSearch}`);
                  
                  if(productSearch =="") return true;
                  if( nameLowerCase.search(re)!=-1) return true;
                  return false;
              }).map(product=>{
                  return(
                      <CardProducts product={product.productName}
                                    key={product.productName}
                                    image={product.items[0].images[0].imageUrl}
                                    price={product.items[0].sellers[0].commertialOffer.Installments[0].Value}
                      />
                  );
              })
          //
              //image={product.items.images.imageUrl}
          }

          
        </div>
    );
}
