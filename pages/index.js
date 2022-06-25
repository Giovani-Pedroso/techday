import {useEffect, useState, useContext} from 'react';

//import of components
import ModalStore from '../components/ModalStore.jsx';
import ModalLogin from "../components/ModalLogin";
import SearchProducts from '../components/SearchProducts.jsx';
import {CartContext} from '../context/ContextCarrinho/index.js';

export default function Home() {
   
    //O context hook é necessario, pois alguns estados são usados
    //por outras páginas e componentes
    //------------------------------------------------
    //the context hook is needed because some states are used in
    //another page and components
    const {idStore,
           setIdStore,
           email,
           setEmail,
           
           handleItems, setCartId} = useContext(CartContext);

    const [openLogin, setOpenLogin] = useState(true);
    
    //Limpa os itens do context quando a 
    //pagina é acessada
    //--------------------------------------
    //clears items in context when the page
    //is accessed
    useEffect(()=>{
        setCartId("");
        handleItems([]);
    },[]);


    //Eu usei o tailwind CSS para estilizar oc componentes
    //-----------------------------
    //I used tailwind CSS to style the components
    return (
        <div className="flex flex-col items-center justify-center ">

          {/*
          componente que é responsável por exibir produtos, bem como procurar um produto específico
          //-------------------------- 
          component that is responsible for displaying products as well as searching for a specific product
          */}
          <SearchProducts
            openLogin={()=>setEmail("")}
            openModal={()=>setIdStore("")}
            
            store={idStore}/>
          
          {/*
          este componente solicitará um CEP e mostrará as lojas próximas
          //-------------------------------------
          this component will ask for a CEP (Brazilian postal code) and will show the near by stores
          */}
          <ModalStore //open={openModal}
                      storeId={idStore}
                      onClose={()=>setOpenModal(false)}
                      onStore={setIdStore}/>
          <ModalLogin
            email={email}
            setEmail={setEmail}
            openLogin={openLogin}
            setOpenLogin={()=>setOpenLogin(false)}
          />
          {/*
         */}
        </div>
    );
}
