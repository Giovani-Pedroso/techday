import {useState} from 'react';

//components Imports
import SearchBar from '../components/SearchBar.jsx';
import Logo from '../components/Logo.jsx';
import ModalStore from '../components/ModalStore.jsx';
import SearchProducts from '../components/SearchProducts.jsx';
import Aviso from '../components/Aviso.jsx';

//test component
//import Modal from '../components/Modal.jsx';

export default function Home() {

    const [openModal, setOpenModal] = useState(true);
    const [storeId, setStoreId] = useState("");
  return (
    <div className="flex flex-col items-center justify-center ">
      
      <SearchProducts
        openModal={()=>setOpenModal(true)}
        store={storeId}/>
      <ModalStore open={openModal}
                  onClose={()=>setOpenModal(false)}
                  onStore={setStoreId}/>
    </div>
  );
}
