import {AiOutlineCheck,
        AiOutlineCheckSquare
       } from 'react-icons/ai';

export default function Logo(){

    return(
        <div className="flex flex-row mt-[40px]">
            <h1 className="text-3xl align-botton text-white">
              Carrefour  
            </h1>
          
            <div className="text-3xl mx-[10px] text-red-400">
              <AiOutlineCheckSquare/>
            </div>
          <h1 className="text-3xl text-white">
             Checklist
          </h1>
        </div>
    );
}
