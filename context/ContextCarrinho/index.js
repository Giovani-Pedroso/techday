import {useState, createContext} from 'react';

export const CartContext = createContext({});

export const CartProvider = ({children}) =>{
    const test = "messsagem de teste";
    const [cartItems, setCarItems] = useState([]);
    
    const test2 = {test: "dois"};
    
    const handleItem =(newItem)=>{
        const newCart = cartItems.filter(item=>{
            if(!item.quantity) return false;
            if(item.productName !=  newItem.productName){
                console.log("filtor retornando valor verdadeiro");
                return true;};
            
            console.log("filtor retornando valor falso");
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
    
    return(
        <CartContext.Provider value={{test, cartItems, handleItem}}>
          {children}
        </CartContext.Provider>
    );

};
