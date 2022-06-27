import {useState, useEffect} from 'react';

//import icons
import {AiOutlineSearch, AiFillFacebook} from 'react-icons/ai';
import {FcGoogle} from 'react-icons/fc';
import {ImFacebook} from 'react-icons/im';

//Firebase
import {app} from '../firebase';//the path of the config file
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

//import of the components
//import CardStore from './CardStore.jsx';

//api end point que retorna uma lista de lojas do Carrefour nas proximidades
//!!! Atenção !!! essa api pode não funcionar no futuro 
//coloque o CEP no final do endereço
//-------------------------------------------------
//api end point that will return a list of close Carrefour stores
//!!! Atention this api maybe not will not work in the future !!!
//place the CEP(brazilian postal code) afther the adress
//const apiGetStores = "https://mercado.carrefour.com.br/api/checkout/pub/regions?country=BRA&postalCode=";

export default function Modal({openLogin,setEmail, email, setOpenLogin }){

    const auth = getAuth();
    const gooleProvider = new GoogleAuthProvider();

    const [emailCreate, setEmailCreate] = useState("");
    const [passwordCreate, setPasswordCreate] = useState("");
    const [passwordCreate2, setPasswordCreate2] = useState("");

    const [emailAccess, setEmailAccess] = useState("");
    const [passwordAccess, setPasswordAccess] = useState("");
    
    //const [user, setUser] = useState("");


    //This section control the language of the component
    const defaultLanguage = {
        signUp:"Sign Up",
        signIn:"Sign In",
        passwordNotEqual:"the passwords are not equal",
        password:"Password",
        login:"Login",
        repeatPassword:"Repeat password",
    };

    const [languageSite, setLanguageSite] = useState(defaultLanguage);

    
    useEffect(()=>{

        const navLanguage = navigator.language;
        if(navLanguage == "pt-BR" || navLanguage == "pt-PT"){
            setLanguageSite({
                signUp:"Cadastre-se",
                signIn:"Entrar",
                passwordNotEqual:"As senhas não são iguais",
                password:"Senha",
                login:"Login",
                repeatPassword:"Repita a senha",
            });
        }
        
    },[]);
    
    const createUser = async (e) =>{
        if(passwordCreate != passwordCreate2) {
            alert(languageSite.passwordNotEqual);
            return 0;
        }
        createUserWithEmailAndPassword(auth, emailCreate, passwordCreate)
            .then((response) => {
                console.log(response.user);
                setEmail(auth.currentUser.email);
                //setOpenLogin();
            })
            .catch((error) =>  alert(error.message));
        e.preventDefault();
        return 0;
    };

    const accessUser = (e)=>{      
        signInWithEmailAndPassword(auth, emailAccess, passwordAccess)
            .then((response) => {
                console.log(response.user);
                
                setEmail(auth.currentUser.email);
                //setOpenLogin();
            })
            .catch((error) =>  alert(error.message));
        e.preventDefault();
        //console.log(getAuth());
    };
    
    const loginWithGoogle = async () =>{
        await signInWithPopup(auth, gooleProvider);
       // console.log("aaaa");
        setEmail(auth.currentUser.email);
        //setOpenLogin();
        //console.log("is open?", openLogin);
    };
    
    const handleSubmit = (e) =>{
        e.preventDefault();
    };

    
    //Se o storeId(variavel do contexto) não for uma string
    //o modal e fechado
    //------------------------------------
    //if the storeId(variable of the contex) is not empty
    //the modal is closed
    if(email)  return null;

    //console.log("current user", auth.currentUser);
    
    //O modal
    //the modal itself
    return(
        <div
          className="flex fixed top-0 left-0 justify-center items-center h-[100vh] w-[100vw] bg-[#0000ff22] ">
          
          <div className="flex flex-col rounded-xl max-h-[90%] w-[80%] bg-white shadow-lg p-4">
            <h1 className="text-[#da251d] text-2xl text-center mb-3">
              {languageSite.signUp}
            </h1>

            {/*Barra de pesquisa*/}
            {/*The search bar*/}
            <div
              onSubmit={handleSubmit}
              className="p-2 flex flex-col justify-around items-center">
              <form
                onSubmit={createUser}
                className="w-full">
                
                <input className="p-2 w-full border-2 border-blue-700"
                       type="text"
                       onChange={(e)=>setEmailCreate(e.target.value)}
                       value={emailCreate}
                       placeholder="Email"/>
                
                <input className="border-t-0 p-2 w-full border-2 border-blue-700"
                       type="password"
                       onChange={(e)=>setPasswordCreate(e.target.value)}
                       value={passwordCreate}
                       placeholder={languageSite.password}/>

                <input className="border-t-0 p-2 w-full border-2 border-blue-700"
                       type="password"
                       onChange={(e)=>setPasswordCreate2(e.target.value)}
                       value={passwordCreate2}
                       placeholder={languageSite.repeatPassword}/>
                
                <button className="bg-blue-700 w-full mb-2 p-2 text-white active:bg-blue-400">
                  {languageSite.login}
                </button>

              <button className="flex flex row justify-center items-center p-2  border-2  w-full mb-[10px] shadow-lg border-blue-700"
                      onClick={()=>{loginWithGoogle();}}>
               <FcGoogle className="mr-[10px]"/> Google
              </button>
              </form>
              
              <h1 className="text-[#da251d] text-2xl text-center mb-3">
                {languageSite.signIn}
              </h1>

              <form className="w-full"
                    onSubmit={accessUser}
              >
                <input className="p-2 w-full border-2 border-blue-700"
                       type="text"
                       value={emailAccess}
                       onChange={(e)=>setEmailAccess(e.target.value)}
                       placeholder="Email"/>

                <input className="border-t-0 p-2 w-full border-2 border-blue-700"
                       type="password"
                       onChange={(e)=>setPasswordAccess(e.target.value)}
                       value={passwordAccess}
                       placeholder={languageSite.password}/>

                <button className="bg-blue-700 w-full mb-2 p-2 text-white active:bg-blue-400" >
                  {languageSite.login}
                </button>
              </form>
              
              <button className="flex flex row justify-center items-center p-2  border-2  w-full mb-[10px] shadow-lg border-blue-700"
                      type="button"
                      onClick={()=>{loginWithGoogle();}}>
               <FcGoogle className="mr-[10px]"/> Google
              </button>
              <hr/>
            </div>

            {/*Mensagem de carregamento*/}
            {/*The message of loading*/}
            {/*
                loading &&
                <h1 className="text-xl">Carregando Lojas...</h1>
            */}

          </div>
        </div>
    );
}
