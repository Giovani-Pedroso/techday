import {useState, useEffect} from 'react';

import Navbar from '../components/Navbar1.jsx';
import CardHistoric from '../components/CardHistoric.jsx';

export default function Historico (){

    const [historicList, setHistoricList] = useState([]);


    //carrega os dados do armazenamento local
    //--------------------------------------
    //load the localstorege data
    useEffect(()=>{
        const list = JSON.parse(localStorage.getItem("historic"));
        console.log(list);
        setHistoricList(list);
        
    },[]);


    const removeItem = (index) =>{
        //copia os dados em um novo array para modificalos
        //-----------------------------------
        //copy the historic to an another array
        //to modify the data
        const copyList = [...historicList];
        
        //remove o historico selecionado 
        //o index é definido na renderização do componente
        //------------------------------------
        //remove the selected historic the index value is 
        //defined in the component's render
        copyList.splice(index,1);
        setHistoricList(copyList);
        localStorage.setItem("historic", JSON.stringify(copyList));
    };
    
    return (
        <div>
          <Navbar/>
          {/*I use flex-reverse because the first item to appear was the oldest one*/}
          <div className="flex flex-col-reverse ml-[10px] ">
          {
            //renderiza os cards do storico
            //---------------------------
            //render the card of the historic
              historicList.map((item, index)=>{
                  console.log(item);
                  return(
                      <CardHistoric date={item.date}
                                    key={item.date}
                                    deleteHistoric={()=>removeItem(index)}
                                    items={item.items}
                                    total={item.totalPrice}
                  />
                  );
          })
          }
        </div>
        </div>
    );
}


