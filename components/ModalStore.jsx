import {useState, useEffect} from 'react';

//import icons
import {AiOutlineSearch} from 'react-icons/ai';

//import of the components
import CardStore from './CardStore.jsx';

//api end point que retorna uma lista de lojas do Carrefour nas proximidades
//!!! Atenção !!! essa api pode não funcionar no futuro 
//coloque o CEP no final do endereço
//-------------------------------------------------
//api end point that will return a list of close Carrefour stores
//!!! Atention this api maybe not will not work in the future !!!
//place the CEP(brazilian postal code) afther the adress
const apiGetStores = "https://mercado.carrefour.com.br/api/checkout/pub/regions?country=BRA&postalCode=";

export default function Modal({storeId, onStore}){

    //States declaration
    const [cep, setCep] = useState('');
    const [storeList, setStoreList] = useState([]);
    const [search, setSearch] = useState(0);



    //This section control the language of the component
    const defaultLanguage = {
        input:"ZIP code only numbers ",
        header:"Find a store nearby",
    };

    const [languageSite, setLanguageSite] = useState(defaultLanguage);

    
    useEffect(()=>{

        const navLanguage = navigator.language;
        if(navLanguage == "pt-BR" || navLanguage == "pt-PT"){
            setLanguageSite({
                input:"CEP apenas numeros",
                header:"Encontre uma loja nas próximidades",
            });
        }
        
    },[]);
    
    //Estado que controla a mensagem de carregamento
    //------------------------------------------
    //This state control the Loading message
    const [loading, setLoading] = useState(false);

    useEffect(()=>{

        //função que vai chamar a api e converter seu retorno em um objeto json
        //-------------------------------------------------
        //function that will call the api and convert in a json object
        const getProducts = async () =>{
            try{
                const stores = await fetch(`${apiGetStores}${cep}`);
                console.log(stores);
                const json = await stores.json();
                setStoreList(json[0].sellers);

                //Esconde a menssagem de carregamento
                //------------------------------------
                //hide the loading message
                setLoading(false);
            }
            
            catch(err){
                //An error happened when searching for a CEP - in portuguese
                console.log(err);
                alert(`ocoreu um erro ao requisitar o cep`);
            };
        };
        //Evita chamar a api com um CEP vazio
        //-----------------------------------
        //this line avoid calling the api with an empty CEP code
        if(search>1)getProducts();        
    },[search]);
    
    const handleSubmit = (e) =>{
        //Se o estado for chamado apenas uma vez a função não funciona
        //------------------------------ 
        //If the state was set only once the function
        //does not work
        setSearch(value=> value+=1);
        setSearch(value=> value+=1);

        //Mostra a mensagem de carregamento
        //-------------------------------------
        //showw a loading message
        setLoading(true);

        //impede que a página seja recarregada 
        //quando o formulário é enviado
        //---------------------
        //prevent the page to reload whent the form is submited
        e.preventDefault();
    };

    //Salve o id no context, esta ação fechará
    //o modal
    //--------------------------------
    //Save the id in the context, this action will close
    //the modal 
    const handleStore = (id)=>{
        onStore(id);
    };

    
    const getUserName = () =>{
        try{
            return auth.currentUser.displayName;
        }

        catch(err){
            return "------";
        }
    };
    
    
    
    //Se o storeId(variavel do contexto) não for uma string
    //o modal e fechado
    //------------------------------------
    //if the storeId(variable of the contex) is not empty
    //the modal is closed
    if(storeId !="" || getUserName == "------" )  return null;

    //O modal
    //the modal itself
    return(
        <div
          className="flex fixed top-0 left-0 justify-center items-center h-[100vh] w-[100vw] bg-[#0000ff22] ">
          
          <div className="flex flex-col rounded-xl max-h-[60%] w-[80%] bg-white shadow-lg p-4">
            <h1 className="text-[#da251d] text-2xl text-center mb-6">
              {languageSite.header}
            </h1>

            {/*Barra de pesquisa*/}
            {/*The search bar*/}
            <form
              onSubmit={handleSubmit}
              className="p-2 text-[#da251d] border-[#da251d] mb-6 border-2 flex justify-between">
              <input value={cep}
                     type="number"
                     onChange={(e)=> setCep(e.target.value)} className="text-black w-full focus:outline-none"
                     placeholder={languageSite.input}/>
              <button>
                <span className="text-2xl"><AiOutlineSearch/></span>
            </button>
            </form>

            {/*Mensagem de carregamento*/}
            {/*The message of loading*/}
            {loading &&
                <h1 className="text-xl">Carregando Lojas...</h1>
            }

            {/*Mostar os Cartões da loja*/}
            {/*Show the cards of the stores*/}
            <div className="flex flex-col overflow-y-auto">
            {

            //renderiza a lista de lojas
            //-----------------------
            //render the store list
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
