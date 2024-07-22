import { iconsProfile } from "../../../Data";
import ProfileImg from "../../../Components/ui/ProfileImg";
import SidesComponents from "../../../Components/ui/SidesComponents";
import GroupChat from "../../../Components/ui/GroupChat";
import { TbPhoto } from "react-icons/tb";
import { GROUPS, baseURL } from "../../../Api/Api";
import UseApiChatGetArray from "../../../Hooks/UseApiChatGetArray";
import { IGroups } from "../../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/store";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { fetchContactGroups } from "../../../Redux/UserInfo/GroupSettingSlice";


const SideGroup = () => {
  const dispatch = useDispatch()
useEffect(()=>{
  dispatch(fetchContactGroups())

},[dispatch])

const token = localStorage.getItem("token");
const mobile = localStorage.getItem("mobile");

   useEffect(() => {
      const pusher = new Pusher('72590cbc8a7ab7f55e9a', {
        authEndpoint:
          "https://cvoxxmpp.dev.itvalues.site/CVOX-WS/broadcasting/auth",
        auth: {
          headers: {
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        },
        cluster: "eu",
        encrypted: true,
      });
        const channel = pusher.subscribe(`private-groups.${mobile}`);

          channel.bind('NewGroupEvent', data => {
          console.log('NewGroupEvent:', data.message);
        });
        

  }, [mobile, token]);





// useEffect(()=>{

//   const pusher = new Pusher('1799492', {
//     cluster: 'eu'
//   });
  
//   const channel = pusher.subscribe(`private-groups.${mobile}`);
  
//   channel.bind('pusher:subscription_succeeded', function(member) {
//     console.log('Subscribed to channel: ' + member.channel);
//   });
  
//   channel.bind('my-event', function(data) {
//     console.log('Received event: ' + data.message);
//   });

// },[])








  const isUpdateData = useSelector(
    (state: RootState) => state.app.isUpdateData
  );

  // ---------- APi Data ----------
  const DataGroupsSide: IGroups[] = UseApiChatGetArray(
    `${baseURL}${GROUPS}`,
    isUpdateData
  );

  // --------- Render ----------------
  const renderFriend = iconsProfile.map((i) => {
    return (
      <ProfileImg key={i.id} width="w-[60px]" hight="h-[60px]" Icon={i.icon} />
    );
  });
  
  const renderGroupsChat = DataGroupsSide?.map((i) => {
    return (
      <GroupChat
      
        item={i}
        key={i.id}
        name={i.name}
        status={i.status}
        created_at={i.created_at}
        icons={TbPhoto}
        id={i.id}
      />
    );

  });
  return (
    <SidesComponents>
      <div className="px-[26px]">
        <div className="flex justify-between mb-[24px]">
          <div className="flex items-center gap-1">
            <p className="font-bold text-[18px]">Gruppi privati</p>
            <span className="text-primary font-medium">(200)</span>
          </div>
          <div>
            <p className="text-primary font-medium">Vedere Tutto</p>
          </div>
        </div>
        <div className="flex items-center justify-between">{renderFriend}</div>
      </div>
      <div className="px-[26px]">
        <p className="font-bold text-[18px]">Gruppi Messaggi</p>
      </div>
      <div className="overflow-y-auto">
        <div className="flex flex-col">{renderGroupsChat}</div>
      </div>

    </SidesComponents>
  );
};

export default SideGroup;
