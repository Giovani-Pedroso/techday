import {useEffect, useState, useContext} from 'react';

//import of components
import ModalStore from '../components/ModalStore.jsx';
import SearchProducts from '../components/SearchProducts.jsx';
import {CartContext} from '../context/ContextCarrinho/index.js';

export default function Home() {

    const [openModal, setOpenModal] = useState(true);
    const [storeId, setStoreId] = useState("");

    const {idStore, setIdStore, handleItems} = useContext(CartContext);

    useEffect(()=>{
        handleItems([]);
    },[]);
    
    console.log("abriu o modal",openModal);
    return (
        <div className="flex flex-col items-center justify-center ">

          {/*component that is responsible for displaying products as well as searching for a specific product*/}
          <SearchProducts
            openModal={()=>{

                setOpenModal(true);
                setIdStore("");
                      }}
            store={idStore}/>
          
          {/*this component will ask for a CEP (Brazilian postal code) and will show the nearby stores,*/}
          <ModalStore open={openModal}
                      storeId={idStore}
                      onClose={()=>setOpenModal(false)}
                      onStore={setIdStore}/>
        </div>
    );
}
