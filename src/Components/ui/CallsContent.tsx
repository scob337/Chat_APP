import { NavLink } from "react-router-dom";
import ProfileImg from "./ProfileImg";
import { IconType } from "react-icons";
import { LuArrowDownRight } from "react-icons/lu";

interface IProps {
  link?:  string;
  name: string;
  icons: IconType;
  time: string;
}
const CallsContent = ({
  link,
  name,
  icons,
  time
  
}: IProps) => {
  return (
    <NavLink to={link} end>
      <div className="relative w-full border-0 rounded-none hover:bg-[#e7e7e7] transition-all duration-300 ">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] h-[1px] bg-[#9AACB5]"></div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <ProfileImg Icon={icons} />
              </div>
              <div className="grid gap-1.5">
                <div className="font-semibold text-[red]">{name}</div>
                <div className="flex gap-[1px] items-center justify-normal ">
                  <LuArrowDownRight size={16} className="text-[red] mt-1" />
                  <div className="text-sm leading-none text-gray-500 ">
                    {time}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default CallsContent;
