import {useState, useEffect} from 'react';

import Navbar from '../components/Navbar1.jsx';
import CardHistoric from '../components/CardHistoric.jsx';


const apiGetProduct = "https://mercado.carrefour.com.br/api/catalog_system/pub/products/search?fq=";
const store = "carrefourbr106";

export default function Historico (){

    const [historicList, setHistoricList] = useState([]);

    useEffect(()=>{

        const list = JSON.parse(localStorage.getItem("historic"));
        console.log(list);
        setHistoricList(list);
        
    },[]);

    const removeItem = (index) =>{
        const copyList = [...historicList];
        console.log("historic", historicList);
        copyList.splice(index,1);
        setHistoricList(copyList);
        localStorage.setItem("historic", JSON.stringify(copyList));
    };
    
    return (
        <div>
          <Navbar/>
          {
              historicList.map((item, index)=>{
                  console.log(item);
                  return(
                      <CardHistoric date={item.date}
                                    deleteHistoric={()=>removeItem(index)}
                                    items={item.items}
                                    total={item.totalPrice}
                  />
                  );
          })
          }
        </div>
    );
}


