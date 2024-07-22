/* eslint-disable @typescript-eslint/no-explicit-any */
import { iconsSide, iconsSideLast, iconsSideMiddle } from "../../../Data";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import SideNav from "./SideNav";
import SideGroup from "./SideGroup";
import SideCalls from "./SideCalls";
import EditSide from "./EditSide";
import { useSelector } from "react-redux";
import { RootState, UseAppDispatch } from "../../../Redux/store";
import { fetchUserData } from "../../../Redux/UserInfo/userSlice";
import { getContactData } from "../../../Redux/GetContaceChat/SliceGetContact";
import Pusher from "pusher-js";
const SideIcons = () => {
  const [isSwitch, setIsSwitch] = useState<string | undefined>(
    location.pathname
  );
  const dispatch = UseAppDispatch();
  const dispatchSide = UseAppDispatch();
  // const dispatchData = useDispatch();
  const Selector = useSelector(
    (state: RootState) => state.user.record?.profile
  );
  const GetContact = useSelector(
    (state: RootState) => state.userChat.getContact
  );
  const Loading = useSelector((state: RootState) => state.userChat.loading);

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);
  useEffect(() => {
    dispatchSide(getContactData());
  }, [dispatchSide]);

  const imageURL = `https://cvoxxmpp.dev.itvalues.site/CVOX-WS/public/storage/${Selector?.avatar}`;
  // -------- Render --------
  const renderMiddle = iconsSideMiddle.map((i) => {
    return (
      <NavLink
        key={i.id}
        to={i.link}
        className="
        Aside_Active
                hover:border-l-[5px] mb-[16px] hover:border-l-[#646464]  border-l-[5px] border-l-transparent hover:bg-[#e0e0e0] transition-all duration-300 flex justify-center items-center cursor-pointer"
        onClick={() => setIsSwitch(i.link)}
      >
        <i.icon size={24} className="h-[60px]" />
      </NavLink>
    );
  });
  const renderFirst = iconsSide.map((i) => {
    return (
      <NavLink
        to={i.link}
        key={i.id}
        onClick={() => setIsSwitch(i.link)}
        className="bg-[#C4C4C4] overflow-hidden ml-1 h-[60px] w-[60px] transition-all duration-300 flex justify-center items-center rounded- cursor-pointer"
      >
        {Selector?.avatar ? (
          <img
            className="object-cover w-full h-full"
            src={imageURL}
            alt="Profile"
          />
        ) : (
          <i.icon size={24} className="h-[60px]" />
        )}
      </NavLink>
    );
  });
  const renderLast = iconsSideLast.map((i) => {
    return (
      <NavLink
        key={i.id}
        to={i.link}
        onClick={i.logout}
        className="Aside_Active hover:border-l-[5px] hover:border-l-[#646464]  border-l-[5px] border-l-transparent hover:bg-[#e0e0e0] transition-all duration-300 flex justify-center items-center cursor-pointer"
      >
        <i.icon size={24} className="h-[60px]" />
      </NavLink>
    );
  });

  const getQrToken = localStorage.getItem("getQr");

  // Pusher
  useEffect(() => {
    const pusher = new Pusher("4c00b6f46d8e7edd0f0c", {
      authEndpoint:
        "https://cvoxxmpp.dev.itvalues.site/CVOX-WS/broadcasting/auth",
      cluster: "mt1",
      encrypted: true,
    });
    const channel = pusher.subscribe(`${getQrToken}`);
    channel.bind(
      "AuthLogoutEvent",
      (data: { token: string; user: { mobile: string } }) => {
        console.log("Received message:", data);
        if (localStorage.getItem("token")) {
          localStorage.removeItem("mobile");
          localStorage.removeItem("token");
          window.location.pathname = "/qr-code";
        }
      }
    );
    
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [getQrToken]);

  return (
    <div className="flex w-[35%]">
      <div className="w-[90px] border border-r-[#9AACB5] h-full py-[60px] flex flex-col justify-between bg-white rounded-l-lg">
        <div className=" px-[5px]">{renderFirst}</div>
        <div>{renderMiddle}</div>
        <div className="flex flex-col gap-[26px]">{renderLast}</div>
      </div>
      {isSwitch === "/" || isSwitch === "/chat" || isSwitch === "/meet" ? (
        <SideNav GetContact={GetContact} Loading={Loading} />
      ) : isSwitch === "/groups" ? (
        <SideGroup />
      ) : isSwitch === "/phonecalls" ? (
        <SideCalls />
      ) : isSwitch === "/edit" ? (
        <EditSide />
      ) : null}
    </div>
  );
};

export default SideIcons;
