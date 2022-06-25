import {useState, useEffect} from 'react';

import {collection, addDoc, getDocs, doc, deleteDoc} from 'firebase/firestore';
import {database} from '../firebase.js';
import {getAuth} from 'firebase/auth';

import Navbar from '../components/Navbar1.jsx';
import CardHistoric from '../components/CardHistoric.jsx';

export default function Historico (){

    const [historicList, setHistoricList] = useState([]);
    const [user, setUser] = useState("");

    //carrega os dados do armazenamento local
    //--------------------------------------
    //load the localstorege data
    useEffect(()=>{
       //const list = JSON.parse(localStorage.getItem("historic"));
       // console.log(list);
        const getAuthUser =  () =>{
            const auth = getAuth();
            console.log("user id", auth.currentUser.uid);
            setUser(auth.currentUser.uid);
            return (auth.currentUser.uid);
            // setUser(auth.currentUser.uid);
        };

        const UserDocs = async (userUid)=>{
            console.log("user: ", userUid);
            const collectionUserRef = collection(database, userUid);
            try{
                var userDocs =  await getDocs(collectionUserRef);
                //console.log("user docs", userDocs.docs[1].data());
               // console.log("user item", userDocs.docs[1].id);
                
            }
            catch(err){
                console.log(err);
                return -1;
            }
            const items = userDocs.docs.map(item=>{
                return {list:item.data(),  id:item.id};
                                                  });

            console.log("items", items);
            setHistoricList( items);
            return 0;
        };


        UserDocs( getAuthUser());
        
        setHistoricList(historicList);
        
    },[]);

    

    const removeItem = (index, id) =>{
        //copia os dados em um novo array para modificalos
        //-----------------------------------
        //copy the historic to an another array
        //to modify the data
        const copyList = [...historicList];


        const docToDelete = doc(database, user, id);
        deleteDoc(docToDelete);
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
          { true && 
            //renderiza os cards do storico
            //---------------------------
            //render the card of the historic
              historicList.map((item, index)=>{
                  //console.log(item);
                  const unix = item.list.date.seconds * 1000;
                  const date = new Date(unix);
                  //console.log(item.list.date);
                  //console.log("date: ", date);
                  return(
                      <CardHistoric date={date}
                                    key={item.list.date}
                                    id={item.id}
                                    deleteHistoric={()=>removeItem(index, item.id)}
                                    items={item.list.items}
                                    total={item.list.totalPrice}
                  />
                  );
          })
          }
        </div>
        </div>
    );
}


