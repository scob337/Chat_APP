import ProfileImg from "../../../Components/ui/ProfileImg";
import ContactChat from "../../../Components/ui/ContactChat";
import SidesComponents from "../../../Components/ui/SidesComponents";
import { iconsProfile } from "../../../Data";
import { IContact } from "../../../interfaces";
import { SkeletonComponent } from "../../../Components/ui/Skeleton";

interface IProps {
  GetContact: [];
  Loading: boolean;
}
const SideNav = ({ GetContact, Loading }: IProps) => {
  // --------- Render ----------------

  const renderFriend = iconsProfile.map((i) => {
    return (
      <ProfileImg key={i.id} width="w-[60px]" hight="h-[60px]" Icon={i.icon} />
    );
  });
  const renderContactChat = GetContact.map((i: IContact) => {
    return (
      <ContactChat
        key={i.phone}
        nameChat={i.name}
        lastMessage={i.my_status}
        icons={i.avatar}
        link={`/chat/${i.phone}`}
      />
    );
  });
  return (
    <SidesComponents>
      <div className="px-[26px]">
        <div className="flex justify-between mb-[24px]">
          <div className="flex items-center gap-1">
            <p className="font-bold text-[18px]">Amici Online</p>
            <span className="text-primary font-medium">(200)</span>
          </div>
          <div>
            <p className="text-primary font-medium">Vedere Tutto</p>
          </div>
        </div>
        <div className="flex items-center justify-between">{renderFriend}</div>
      </div>
      <div className="px-[26px]">
        <p className="font-bold text-[18px]">Messaggi</p>
      </div>
      <div className="overflow-y-auto">
        {Loading ? (
          <SkeletonComponent />
        ) : (
          <div className="flex flex-col">{renderContactChat}</div>
        )}
      </div>
    </SidesComponents>
  );
};

export default SideNav;
