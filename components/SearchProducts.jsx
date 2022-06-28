import {useEffect, useState} from 'react';

//Uma versão da tag a optimizada para o  nextJs
//------------------------------------------
//a version of the "a tag" optimized for nextJs
import Link from 'next/link';
import {BiExit} from 'react-icons/bi';
import {getAuth} from 'firebase/auth';
import {collection, addDoc, getDocs} from 'firebase/firestore';
import {database} from '../firebase.js';

//icons
import {AiOutlineSearch,
        AiOutlineShoppingCart,
        AiOutlineClockCircle} from 'react-icons/ai';

//component
import CardProducts from './CardProducts.jsx';
import Logo from './Logo.jsx';


//Essa api retorna a lista de produtos disponíveis em uma loja,
//coloque o id da loja no final da api esse id é obtido pela api do componente 
//"modalStore" 
//-------------------------------------------
//api that will return a list on products on a store
//put the store id in the end on the api, this id is given be the api in the ModalStore component
const apiGetProduct = "https://mercado.carrefour.com.br/api/catalog_system/pub/products/search?fq=";

export default function SearchProducts({store, openModal, openLogin}){

    const auth = getAuth();
    
    
    //states creation
    const [productList, setProductsList] = useState([]);
    const [productSearch, setProductSearch] = useState("");
    const [inputValue, setInputValue] = useState("");


    //This section control the language of the component
    const defaultLanguage = {
        loadMessage:"Loading Products",
        changeStore:"Change store",
        user:"User",
        products:"Product ",
        store:"Store",
    };

    const [languageSite, setLanguageSite] = useState(defaultLanguage);

    useEffect(()=>{

        const navLanguage = navigator.language;
        if(navLanguage == "pt-BR" || navLanguage == "pt-PT"){
            setLanguageSite({

                loadMessage:"Carregando produtos",
                changeStore:"Mudar Loja",
                user:"Usuario",
                products:"Produto ",
                store:"Loja",
            });
        }
        
    },[]);


    
    //Esse estado controla a mensagem de carregamento
    //----------------------------
    //This state control the Loading message
    const [loading, setLoading] = useState(true);

    useEffect(()=>{

        //função que vai chamar a api e converter seu retorno em um objeto json
        //----------------------------------------------------
        //function that will call the api and convert in a json object
        const getProducts = async ()=>{
            try{
                setLoading(true);
                const product = await fetch(`${apiGetProduct}${store}`);
                const jsonProduct = await product.json();
                setProductsList(jsonProduct);

                //Esconde a mensagem de carregamento
                //---------------------------
                //hide the loading message
                setLoading(false);
            }
            catch(err){
                console.log(err.message);
            };
        };

        //console.log("nav language: ", navigator.language );

        

        

        //Evita chamar a api com um id vazio
        //-----------------------------------
        //this line avoid calling the api with an empty Id store
        if(store) getProducts();
    },[store]);

    //Função que cuida da busca por produtos
    //-------------------------------
    //Function that handle the search, the search method will be explain
    //in the below
    const handleSubmit = (e) =>{
        setProductSearch(inputValue.toLowerCase());

        //impede que a página seja recarregada 
        //quando o formulário é enviado
        //-----------------------------------
        //prevent the page to reload whent the form is submited
        e.preventDefault();
    };

    //função que mostra os produtos na tela
    //-----------------------------------------
    //function to show the products in the window
    const getProducts =() =>{

      //Expreção regular usada na busca dos produtos
      //--------------------------------------
      //this regular expresion will be use 
      //to search for products
      const re = new RegExp(`${productSearch}`);
      
      //first run for all items 
      return  productList.map(product=>{

              //faz as letras ficarem minusculas
              // isso melhora a experiencia do
              //usuario
              //-----------------------------------
              //make all letter lower case
              //this imporve the user expirience 
              const nameLowerCase = product.productName.toLowerCase();
                  
                  // ele irá verificar se o producSearch está vazio significando
                  //que nada foi pesquisado ou se o nome tem a regex
                  //---------------------------  
                  //it will check if the producSearch is empty meaning 
                  //that nothing was search or if the name have the regex
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
                  
                  //se falhar na verificação  também devolverá o produto
                  //mas com a propriedade hidden, foi feito assim
                  //pois se o componente não for devolvido ele perde seu
                  //estado causando o inconveniente de perder os produtos 
                  //selecionados após uma pesquisa
                  //-----------------------------------------------------------
                  //if verification fails, the product will also be returned
                  //but with the property hidden, it was done like this
                  //because if the component is not returned, it loses its
                  //state causing the inconvenience of losing the selected products after a search
                  return(
                      <div key={product.productName} className="hidden">
                        <CardProducts product={product.productName}
                                      image={product.items[0].images[0].imageUrl}
                                      price={product.items[0].sellers[0].commertialOffer.Installments[0].Value}
                        />
                      </div>
                  );
      });


    };
    //console.log("auth é igua", auth);

    const getUserName = () =>{
       // console.log(auth.currentUser);
        try{
            return auth.currentUser.email;
        }

        catch(err){
            return "------";
        }
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
                     placeholder={languageSite.products}/>
              <button>
                <span className="text-2xl text-blue-700"><AiOutlineSearch/></span>
            </button>
            </form>
            
            {/*
            Essa botão fará com que o storeId se torne uma string
            vazio fazendo com que o modal apareça
            //--------------------------------------------
            This button will clear the store Id, this action
            will open the modal for search for a new store
            */}
            <div className="mb-4 flex flex-col justify-between w-[80%]">
              <div className="mb-2 flex items-center" >
                <b>{languageSite.user}:</b>
                {" "}
                {getUserName()}{" "}
                <button
                  className="text-red-400"
                  onClick={()=>{
                      openLogin();}}
                >
                  <BiExit className="ml-[4px] text-2xl"/>
                </button>
              </div>
              <div>
                <b>{languageSite.store}:</b> {store} <button
                               className="text-red-400"
                                       onClick={openModal}> {languageSite.changeStore}</button>
              </div>
            </div>
          </nav>


          {/*The message of loading*/}
          {(loading && (store!="")) &&
           <h1 className="text-xl text-center w-full m-[60px]">{languageSite.loadMessage}...</h1>
          }

          {/*return the products*/}
          {!loading && getProducts()}

          
        </div>
    );
}
