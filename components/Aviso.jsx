import {useState} from 'react';

export default function Aviso({text, type , open, onClose}){
    const [isOpen, setIsOpen] = useState(true); 
    var color="";

    if(type == "perigo") color = "bg-red-700";
    if(type == "aviso") color = "bg-blue-700";
    else color = "bg-green-700";
    
    setTimeout(()=>{
        console.log("close aviso");
        onClose();
        
    },10000);
    
    if(!open) return null;
    
    return(
        <div className="flex justify-center w-[100vw]  fixed top-0 left-0">
        <div className={`w-[80%] z-50 ${color} p-4 text-white m-[60px] border-4 boder-white rounded-lg`}>
              {text}
            </div>
            </div>
        
    );
}
