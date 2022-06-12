import {useEffect, useState, useContext} from 'react';

//import of components
import ModalStore from '../components/ModalStore.jsx';
import SearchProducts from '../components/SearchProducts.jsx';
import {CartContext} from '../context/ContextCarrinho/index.js';

export default function Home() {
    //the context hook is needed because some states are used in
    //another page and components
    const {idStore, setIdStore, handleItems} = useContext(CartContext);
    
    //clears items in context when the page
    //is accessed
    useEffect(()=>{
        handleItems([]);
    },[]);
   
    //I used tailwind CSS to style the components
    return (
        <div className="flex flex-col items-center justify-center ">

          {/*component that is responsible for displaying products as well as searching for a specific product*/}
          <SearchProducts
            openModal={()=>setIdStore("")}
            store={idStore}/>
          
          {/*this component will ask for a CEP (Brazilian postal code) and will show the nearby stores,*/}
          <ModalStore //open={openModal}
                      storeId={idStore}
                      onClose={()=>setOpenModal(false)}
                      onStore={setIdStore}/>
        </div>
    );
}
