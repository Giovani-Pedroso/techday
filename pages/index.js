import {useState, useContext} from 'react';

//import of components
import ModalStore from '../components/ModalStore.jsx';
import SearchProducts from '../components/SearchProducts.jsx';

export default function Home() {

    const [openModal, setOpenModal] = useState(true);
    const [storeId, setStoreId] = useState("");


    return (
        <div className="flex flex-col items-center justify-center ">

          {/*component that is responsible for displaying products as well as searching for a specific product*/}
          <SearchProducts
            openModal={()=>setStoreId("")}
            store={storeId}/>
          
          {/*this component will ask for a CEP (Brazilian postal code) and will show the nearby stores,*/}
            <ModalStore open={openModal}
                        onClose={()=>setOpenModal(false)}
                        onStore={setStoreId}/>
        </div>
    );
}
