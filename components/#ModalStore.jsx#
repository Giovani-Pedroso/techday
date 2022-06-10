import {useState, useEffect} from 'react';

//import icons
import {AiOutlineSearch,
        AiOutlineClose,} from 'react-icons/ai';

import CardStore from './CardStore.jsx';

//place the CEP(brazilian postal code afther this end point)
const apiGetStores = "https://mercado.carrefour.com.br/api/checkout/pub/regions?country=BRA&postalCode=";

export default function Modal({open, onClose, onStore}){

    //States declaration
    const [cep, setCep] = useState('');
    const [storeList, setStoreList] = useState([]);
    const [search, setSearch] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{    
        const getProducts = async () =>{
            try{
                const stores = await fetch(`${apiGetStores}${cep}`);
                console.log(stores);
                const json = await stores.json();
                console.log(json);
                setStoreList(json[0].sellers);
                setLoading(false);
            }
            catch(err){
                alert(`ocoreu um erro ao requisitar o cep`);
            };
        };
        if(search>1)getProducts();        
    },[search]);
    
    const handleSubmit = (e) =>{
        setSearch(value=> value+=1);
        console.log(search);
        console.log("CEP:",cep);
        setLoading(true);
        e.preventDefault();
    };

    const handleStore = (id)=>{
        onStore(id);
        console.log(id);
        onClose();
    };

    if(!open) return null;

    return(
        <div
          className="flex fixed top-0 left-0 justify-center items-center h-[100vh] w-[100vw] bg-[#0000ff22] ">
          
          <div className="flex flex-col rounded-xl max-h-[60%] w-[80%] bg-white shadow-lg p-4">
            <h1 className="text-[#da251d] text-2xl text-center mb-6">Enconter uma loja nas proximidades</h1>
            <form
              onSubmit={handleSubmit}
              className="p-2 text-[#da251d] border-[#da251d] mb-6 border-2 flex justify-between">
              <input value={cep}
                     type="number"
                     onChange={(e)=> setCep(e.target.value)} className="text-black w-full focus:outline-none"
                     placeholder="CEP apenas numeros"/>
              <button>
                <span className="text-2xl"><AiOutlineSearch/></span>
            </button>
            </form>
            {loading &&
                <h1 className="text-xl">Loading Stores...</h1>
            }
            
          <div className="flex flex-col overflow-y-auto">
            {
                storeList.map((store)=>{
                    return(
                        <CardStore
                          key={store.id}
                          handleStore={handleStore}
                          idStore={store.id} />
                    );
                    
                })
            }
          </div>
          </div>
        </div>
    );
}

const Card = () =>{

    return(
        <div>
          ajkfslafsjk
        </div>
    );
};

//#da251d
