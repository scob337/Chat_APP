import { ReactNode } from "react";
interface IProps {
  children: ReactNode;
}
const SendMSGContent = ({ children }: IProps) => {
  return (
    <p
      className="Send relative  p-2 headerQr w-[fit-content] max-w-[70%] 
    rounded-xl text-[18px] ms-auto
    z-9
    text-white z-10
    after:content-[''] after:absolute after:top-[0px] after:right-[-8px] after:w-[20px] after:h-[20px]
    "
    >
      {children}
      <p className="text-[12px] font-medium text-white absolute right-[10px] bottom-[5px] z-[999]">
        12:00
      </p>
    </p>
  );
};

export default SendMSGContent;
