import ProfileImg from "./ProfileImg";
import { IconType } from "react-icons";
import { useDispatch } from "react-redux";
import { FaPhoneAlt, FaVideo } from "react-icons/fa";
import { toggleSidebar } from "../../Redux/reduxSlice";
import ChatHeaderDropList from "./ChatHeaderDropList";
import { Link } from "react-router-dom";
import { SkeletonComponentOne } from "./Skeleton";
interface IProps {
  nameChat?: string;
  lastSeen?: string;
  icons?: IconType | undefined;
  id?: string | null;
  isLoading?:boolean
}

const HeaderChat = ({ nameChat, lastSeen, icons, id, isLoading }: IProps) => {
  // ** --------- ReduxSlice ---------
  const dispatch = useDispatch();
  const handleToggleSidebar = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="relative w-full 
    px-3
    border-0 border-b-[1px] bg-white border-b-[#9AACB5] rounded-none shadow-md">
      <div className="p-4">
        <div className="flex items-center justify-between">
        {isLoading ? <SkeletonComponentOne /> :  <div
            className="flex items-center space-x-4 cursor-pointer"
            onClick={handleToggleSidebar}
          >
            <div>
              <ProfileImg Icon={icons} />
            </div>
            <div className="grid gap-1.5">
              <div className="font-semibold">{nameChat}</div>
              <div className="flex gap-[1px] items-center">
                <div className="text-sm leading-none text-gray-500 ">
                  {lastSeen}
                </div>
              </div>
            </div>
          </div>}
          <div className="z-20 flex items-center space-x-4">
            <Link to="/meet">
              <FaVideo className="cursor-pointer" size={20} />
            </Link>
            <Link to="/meet">
              <FaPhoneAlt className="cursor-pointer" size={18} />
            </Link>

            <ChatHeaderDropList ID={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderChat;
