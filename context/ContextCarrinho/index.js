import {useState, useEffect, createContext} from 'react';

//import {app} from '../../firebase';//the path of the config file
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
export const CartContext = createContext({});

export const CartProvider = ({children}) =>{
    const test = "messsagem de teste";
    const [cartItems, setCarItems] = useState([]);
    const [idStore, setIdStore] = useState("");
    const [cartId, setCartId] = useState("");
    const [email, setEmail] = useState("");
    
    const test2 = {test: "dois"};

    //----------- Fire base configs 
   // const gooleProvider = new GoogleAuthProvider();


    
    
    const handleItem =(newItem)=>{
        const newCart = cartItems.filter(item=>{
            if(!item.quantity) return false;
            if(item.productName !=  newItem.productName){
                console.log("filtor retornando valor verdadeiro");
                return true;};
            
            //console.log("filtor retornando valor falso");
            return false;
        });
        newCart.push(newItem);

        //arange the items  in alphabetic order
        const shortCart = newCart.sort((a,b)=>{
            if(a.productName> b.productName)return 1;
            else if(a.productName> b.productName)return -1;
            return 0;
        });
        
        setCarItems(shortCart);
    };

    const handleItems = (items)=>{
        setCarItems(items);
    };
    
    return(
        <CartContext.Provider value={{
            test,
            cartId,
            setCartId,
            email,
            setEmail,
            handleItems,
            cartItems,
            idStore,
            setIdStore,
            handleItem}}>
          {children}
        </CartContext.Provider>
    );

};
