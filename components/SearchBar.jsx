import {useState, useEffect} from 'react';

import {AiOutlineSearch,
        AiOutlineClose,} from 'react-icons/ai';

import CardStore from './CardStore.jsx';
import CardProducts from './CardProducts.jsx';


const api1 = "https://mercado.carrefour.com.br/api/checkout/pub/regions?country=BRA&postalCode=";

//carrefourbr1056
const api2 = "https://mercado.carrefour.com.br/api/catalog_system/pub/products/search?fq=";

const pathCep = '/api/checkout/pub/regions?country=BRA&';
const pathProducts = '/api/catalog_system/pub/products/search?';

const headers = {
  method: 'GET',
  mode: 'cors',
  cache: 'default'
};

//

export default function SearchBar(){

    const [search, setSearch] = useState("");
    const [storeList, setStoreList] = useState([]);
    const [storeId, setStoreId] = useState("carrefourbr1056");
    const [hideStores, setHideStores] = useState(false);
    const [cep, setCep] = useState('');
    const [products, setProducts] = useState([]);

    const [style, setStyle] = useState({});
    
    /*
    //get the stores id
    useEffect(()=>{    
        const getStores = async () =>{
            try{
                const stores = await fetch(`${api1}${cep}`);
                console.log(stores);
                const json = await stores.json();
//                console.log(json[0].sellers);
                setStoreList(json[0].sellers);
            }
            catch(err){ console.log(err.message);};
        };
        getStores();

    },[search]);
    */
    const handleStore = (id) =>{
        setStoreId(id);
        setStoreId(id);
        //set
        console.log(storeId);
    };

    //get products
    useEffect(()=>{    
        const getProducts = async () =>{
            try{
                const products = await fetch(`${api2}${storeId}`);
                console.log(products);
                const json = await products.json();
                console.log(json);
                //setProducts(json[0].sellers);
            }
            catch(err){ console.log(err.message);};
        };
        getProducts();

        
    },[]);




    
    return(
        <div className="flex flex-col">
        <div className="flex flex-row justify-between w-[80%] p-3 ">



          
          {/*Busca de loja*/}
          <div className="flex flex-rol">
            <div>
              <input
                type="number"
                value={cep}
                onChange={(e)=>{setCep(e.target.value);}}
                className="border-2 p-2 border-blue-500"
                placeholder="Type a postal code"/>
            </div>
            
            {/*Botão de busca*/}
            <div>
              <a onClick={()=>setSearch(cep)}>
                <span
                  className="text-3xl text-red-500">
                  <AiOutlineSearch/>
                </span>
              </a>
            </div>
          </div>

          {/*Busca de produto*/}
          <div className="hidden">
          {/*Botão lojas*/}
            <div className="text-blue-500">
              <button>Loja </button>
            </div>
            
            {/*Busca de produtos*/}
            <div>
              <input
                className="border-2 border-blue-500"
                placeholder="Digite o item"/>
            </div>
            
            {/*Botão de busca*/}
            <div>
              <a>
                <span className="text-3xl text-red-500"> <AiOutlineSearch/> </span>
              </a>
            </div>
          </div>
        </div>

          <CardProducts product={"Arroz"}/>
          <CardProducts product={"Arroz"}/>
          <CardProducts product={"Arroz"}/>
          <CardProducts product={"Arroz"}/>
          {
             !hideStores && (
                  storeList.map((store)=>{
                      return(
                          <CardStore
                            key={store.id}
                            handleStore={handleStore}
                            idStore={store.id} />
                      );
                  })
              )
          }
          
        </div>
    );
}
