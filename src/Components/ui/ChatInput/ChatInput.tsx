import { CiFaceSmile, CiCamera } from "react-icons/ci";
import { MdAttachFile } from "react-icons/md";
import Input from "../Input";
import { useRef } from "react";
const ChatInput = () => {
  const Camera = useRef()
  const HandleGetCamera = ()=>{
    navigator.mediaDevices
    .getUserMedia()
    .then((stream) => {
        console.log(stream)
    })
    .catch((error) => {
      console.log(error);
    });
  }
  return (
    <div className="flex items-center justify-around p-3">
      <div className="flex items-center justify-center gap-2 w-[80%]">
        <CiFaceSmile fontSize={26} className="cursor-pointer" />
      <Input
            border="focus:border-[#7B52d3]"
            placeholder="Inserisci il tuo testo
"
          />
      </div>
            <video ref={Camera}>

            </video>
      <div className="flex items-center justify-center gap-2">
        <MdAttachFile fontSize={26} className="cursor-pointer" />
        <CiCamera fontSize={26} className="cursor-pointer"  onClick={()=> HandleGetCamera()}/>
      </div>
    </div>
  );
};

export default ChatInput;
