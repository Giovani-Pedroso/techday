import {AiOutlineCheck,
        AiOutlineCheckSquare
       } from 'react-icons/ai';

import {SiCarrefour} from 'react-icons/si';

export default function Logo(){

    return(
        <div className="flex flex-row p-2 h-[60px] justify-center items-center mt-[0px] text-xl md:text-3xl">
          {/*
            <div className="mx-[20px] text-[60px] text-red-400">
              <SiCarrefour/>
            </div>
    */}
            <h1 className="align-botton text-white">
              Carrefour  
            </h1>
          
            <div className="mx-[20px] text-[60px] text-red-400">
              <AiOutlineCheckSquare/>
            </div>
          <h1 className=" text-white">
             Checklist
          </h1>
        </div>
    );
}
