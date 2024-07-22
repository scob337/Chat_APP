import { NavLink } from "react-router-dom";
import ProfileImg from "./ProfileImg";
import { BsCheck2All } from "react-icons/bs";
import { IconType } from "react-icons";
import { useDispatch } from "react-redux";
import { PushAsideInfo } from "../../Redux/UserInfo/GroupSettingSlice";

interface IProps {
  name: string;
  status: string;
  created_at: string | number;
  icons: IconType;
  id: string | number;
  item:object[]
}
const GroupChat = ({ name, status, created_at, icons, id , item }: IProps) => {

  // `https://cvoxxmpp.dev.itvalues.site/CVOX-WS/api/v1/groups/${groupid}/delete_group`

  const dispatch = useDispatch();



  return (
    <NavLink to={`groups/${id}`} 
    
    onClick={()=> dispatch(PushAsideInfo(item))}>
 
        <div className="relative w-full border-0 rounded-none hover:bg-[#e7e7e7] transition-all duration-300 "> 
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] h-[1px] bg-[#9AACB5]"></div>
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <ProfileImg Icon={icons} />
              </div>
              <div className="grid gap-1.5">
                <div className="font-semibold">{name}</div>
                <div className="flex gap-[1px] items-center">
                  <BsCheck2All size={14} className="text-[#09ada5] mt-1" />
                  <div className="text-sm leading-none text-gray-500 ">
                    {status}
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-auto text-xs text-gray-500">
              {created_at}

          
 
            </div>
          </div>
        </div>
      </div>
    </NavLink>
  );
};

export default GroupChat;
