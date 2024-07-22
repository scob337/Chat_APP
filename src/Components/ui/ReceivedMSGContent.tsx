import { ReactNode } from "react";
interface IProps {
  children: ReactNode;
}
const ReceivedMSGContent = ({ children }: IProps) => {
  return (
    <p className="p-2 z-9 Recevied relative text-black bg-[#fff] w-[60%] 
    max-w-[70%] rounded-xl text-[18px]  after:content-[''] 
    after:absolute after:top-[0px] after:left-[-8px] after:w-[20px]
     after:h-[20px]">
      {children}
      <p className="text-[12px] font-medium text-black absolute right-[18px] bottom-[5px] z-[999]">
        12:00
      </p>
    </p>
  );
};

export default ReceivedMSGContent;
