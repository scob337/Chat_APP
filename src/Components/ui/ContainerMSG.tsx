import { ReactNode } from "react";
interface IProps {
  children: ReactNode;
}
const ContainerMSG = ({ children }: IProps) => {
  return (
    <div className="flex flex-col w-[95%]  m-auto max-h-full gap-3 p-5
     overflow-y-auto text-white bg-[#EDEBEF] bg-back ">
      {children}
    </div>
  );
};

export default ContainerMSG;
