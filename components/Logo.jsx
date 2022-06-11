import {AiOutlineCheck,
        AiOutlineCheckSquare
       } from 'react-icons/ai';

export default function Logo(){

    return(
        <div className="flex flex-row p-2 h-[60px] justify-center items-center mt-[0px]">
            <h1 className="text-3xl align-botton text-white">
              Carrefour  
            </h1>
          
            <div className="text-3xl mx-[20px] text-red-400">
              <AiOutlineCheckSquare/>
            </div>
          <h1 className="text-3xl text-white">
             Checklist
          </h1>
        </div>
    );
}
