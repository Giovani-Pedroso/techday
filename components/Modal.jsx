//import img from './placeHolder.png';

export default function ModalStore({open, onClose}){
//    if(!open){
//        return null;
//    }

    return(
        <div
          className=" flex fixed top-0 left-0 justify-center items-center h-[100vh] w-[100vw] bg-[#222222cc]">
          
          <div
            className="flex flex-rol  h-[30%] w-[60%] bg-blue-200 p-2">
            <img className="h-full w-[30%]" src={"./placeHolder.png"}/>
            <p>Modal Modal modla</p>
          </div>
        </div>
    );
}
