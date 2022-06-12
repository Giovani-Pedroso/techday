import {useEffect, useState} from 'react';

import Link from 'next/link';

//icons
import {AiOutlineSearch,
        AiOutlineClose,
        AiOutlineShoppingCart,
        AiOutlineClockCircle} from 'react-icons/ai';

//component
import CardProducts from './CardProducts.jsx';
import Logo from './Logo.jsx';

//api that will return a list on products on a store
//put the store id in the end on the api, this id is given be the api in the ModalStore component
const apiGetProduct = "https://mercado.carrefour.com.br/api/catalog_system/pub/products/search?fq=";

export default function SearchProducts({store, openModal}){

    //states creation
    const [productList, setProductsList] = useState([]);
    const [productSearch, setProductSearch] = useState("");
    const [inputValue, setInputValue] = useState("");

    console.log("store in the search", store);
    
    useEffect(()=>{
        
        const getProducts = async ()=>{
            try{
                const product = await fetch(`${apiGetProduct}${store}`);
                const jsonProduct = await product.json();
                setProductsList(jsonProduct);
            }
            catch(err){console.log(err.message);};

        };
        if(store)getProducts();

    },[store]);


    const handleSubmit = (e) =>{
        setProductSearch(inputValue.toLowerCase());
        e.preventDefault();
    };
    
    return(
        <div className="flex flex-wrap w-[100%] justify-center ">
          <nav className="flex pt-[20px] sticky top-0 left-0 w-[100vw] drop-shadow-2xl flex-col items-center justify-center  bg-blue-700 text-white w-full md:static">
            
            <div className="flex w-full justify-between  mt-[0px] pr-3">
              <div className="ml-[20px]">
                <Link href="./historico" >
                  <a className="text-3xl ">                  
                    <AiOutlineClockCircle/>
                  </a>
                </Link>
              </div>
              <div className="mr-[10px]">
                <Link href="./cart" >
                  <a className="text-3xl ">                  
                <AiOutlineShoppingCart/>
                  </a>
                </Link>
              </div>
          
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

          
              productList.map(product=>{
                  const nameLowerCase = product.productName.toLowerCase();
                  const re = new RegExp(`${productSearch}`);
                  
                  if((productSearch =="") ||(nameLowerCase.search(re)!=-1) ){
                      return(
                          <div className="w-[50%] h-[400px] sm:w-[33%] md:w-[20%] md:m-[20px]">
                        <CardProducts product={product.productName}
                                      key={product.productName}
                                      image={product.items[0].images[0].imageUrl}
                                      price={product.items[0].sellers[0].commertialOffer.Installments[0].Value}
                        />
                      </div>
                      );
                  }
                  return(
                      <div className="hidden">
                        <CardProducts product={product.productName}
                                      key={product.productName}
                                      image={product.items[0].images[0].imageUrl}
                                      price={product.items[0].sellers[0].commertialOffer.Installments[0].Value}
                        />
                      </div>
                  );
              })
          /*
              productList.filter(product=>{
                  const nameLowerCase = product.productName.toLowerCase();
                  const re = new RegExp(`${productSearch}`);
                  
                  if(productSearch =="") return true;
                  if( nameLowerCase.search(re)!=-1) return true;
                  return false;
              }).map(product=>{
                  return(
                      <div className="">
                        <CardProducts product={product.productName}
                                      key={product.productName}
                                      image={product.items[0].images[0].imageUrl}
                                      price={product.items[0].sellers[0].commertialOffer.Installments[0].Value}
                        />
                      </div>
                  );
              })
          */}

          
        </div>
    );
}
