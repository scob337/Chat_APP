import { NavLink} from "react-router-dom";
import ProfileImg from "./ProfileImg";
import { BsCheck2All } from "react-icons/bs";

interface IProps {
  link?:  string|undefined;
  nameChat?: string;
  lastMessage?: string;
  timeMessage?: string;
  icons?: string;
}
const ContactChat = ({
  link,
  nameChat,
  lastMessage,
  // timeMessage,
  icons,
}: IProps) => {
  return (
    <NavLink to={link}>
      <div className="relative w-full border-0 rounded-none hover:bg-[#e7e7e7] transition-all duration-300 ">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] h-[1px] bg-[#9AACB5]"></div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <ProfileImg Icons={icons} />
              </div>
              <div className="grid gap-1.5">
                <div className="font-semibold">{nameChat}</div>
                <div className="flex gap-[1px] items-center">
                  <BsCheck2All size={14} className="text-[#09ada5] mt-1" />
                  <div className="text-sm leading-none text-gray-500 ">
                    {lastMessage}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="ml-auto text-xs text-gray-500">{timeMessage}</div> */}
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default ContactChat;
