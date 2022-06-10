export default function CardStore({idStore, handleStore}){

    return(
        <div className="flex flex-rol  h-[100px] justify-between  p-4 w-[100%] border-b-2 text-white bg-blue-700">
          <a className="w-full cursor-pointer" onClick={()=>handleStore(idStore)}>
            <p className="text-xl p-4 item-center">{idStore}</p>
          </a>
        </div>
    );
}

//<button onClick={()=>handleStore(idStore)}>Select store</button>
