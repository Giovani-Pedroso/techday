import Link from 'next/link';
import {AiOutlineArrowLeft,
       AiOutlineClockCircle} from 'react-icons/ai';
import Logo from './Logo.jsx';

export default function Navbar1({isCart}){

    return(
          <nav className="flex flex-row text-white justify-between items-center p-[20px] bg-blue-700 sticky top-0 left-0 md:static">
            <div className="mr-[40px]">
              <Link href="./">
                <AiOutlineArrowLeft className="text-3xl cursor-pointer"/>
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <Logo/>
            </div>
        
            <div className="mr-[40px]">
              { isCart &&
                  <Link href="./historico">
                    <AiOutlineClockCircle className="text-3xl cursor-pointer"/>
                  </Link>
              }
            </div>
          </nav>
    );
}
