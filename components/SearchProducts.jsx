import {useEffect, useState} from 'react';

//a version of the "a tag" optimized for nextJs
import Link from 'next/link';

//icons
import {AiOutlineSearch,
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
    
    //This state control the Loading message
    const [loading, setLoading] = useState(true);
    
    useEffect(()=>{

        //function that will call the api and convert in a json object
        const getProducts = async ()=>{
            try{
                const product = await fetch(`${apiGetProduct}${store}`);
                const jsonProduct = await product.json();
                setProductsList(jsonProduct);

                //hide the loading message
                setLoading(false);
            }
            catch(err){console.log(err.message);};

        };

        //this line avoid calling the api with an empty Id store
        if(store) getProducts();
    },[store]);

    //Function that handle the search, the search method will be explain
    //in the below
    const handleSubmit = (e) =>{
        setProductSearch(inputValue.toLowerCase());
        //prevent the page to reload whent the form is submited
        e.preventDefault();
    };

    const getProducts =() =>{

      return  productList.map(product=>{
               const nameLowerCase = product.productName.toLowerCase();
                  const re = new RegExp(`${productSearch}`);
                  
                  if((productSearch =="") ||(nameLowerCase.search(re)!=-1) ){
                      return(
                          <div key={product.productName} className="w-[50%] h-[420px] sm:w-[33%] md:w-[20%] md:m-[20px]">
                            <CardProducts product={product.productName}
                                      
                                      image={product.items[0].images[0].imageUrl}
                                      price={product.items[0].sellers[0].commertialOffer.Installments[0].Value}
                        />
                      </div>
                      );
                  }
                  return(
                      <div key={product.productName} className="hidden">
                        <CardProducts product={product.productName}
                                      image={product.items[0].images[0].imageUrl}
                                      price={product.items[0].sellers[0].commertialOffer.Installments[0].Value}
                        />
                      </div>
                  );
              })


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

            {/*Search bar*/}
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
            
            {/*This button will clear the store Id, this action
              will open the modal for search for a new store
            */}
            <div className="mb-4">
              Loja {store} <button
                             className="text-red-400"
                             onClick={openModal}> Mude de loja</button>
            </div>
          </nav>


          {/*The message of loading*/}
          {(loading && (store!="")) &&
                <h1 className="text-xl">Carregando Produtos...</h1>
          }
          {
              getProducts()
              /*
              productList.map(product=>{
                  const nameLowerCase = product.productName.toLowerCase();
                  const re = new RegExp(`${productSearch}`);
                  
                  if((productSearch =="") ||(nameLowerCase.search(re)!=-1) ){
                      return(
                          <div key={product.productName} className="w-[50%] h-[420px] sm:w-[33%] md:w-[20%] md:m-[20px]">
                            <CardProducts product={product.productName}
                                      
                                      image={product.items[0].images[0].imageUrl}
                                      price={product.items[0].sellers[0].commertialOffer.Installments[0].Value}
                        />
                      </div>
                      );
                  }
                  return(
                      <div key={product.productName} className="hidden">
                        <CardProducts product={product.productName}
                                      image={product.items[0].images[0].imageUrl}
                                      price={product.items[0].sellers[0].commertialOffer.Installments[0].Value}
                        />
                      </div>
                  );
              })
              */
          }

          
        </div>
    );
}
