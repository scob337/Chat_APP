import { TbPhoto } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import HeaderChat from "../../../Components/ui/HeaderChat";
import ChatInput from "../../../Components/ui/ChatInput/ChatInput";
import ContainerMSG from "../../../Components/ui/ContainerMSG";
import ReceivedMSGContent from "../../../Components/ui/ReceivedMSGContent";
import SendMSGContent from "../../../Components/ui/SendMSGContent";
import { useParams } from "react-router-dom";
import { baseURL, GROUPS } from "../../../Api/Api";
import { useEffect, useState } from "react";
import axios from "axios";
import CheckListContact from "../../../Components/ui/CheckListContact";
import { getContactData, getID } from "../../../Redux/AddGroupSlice";
import { RootState } from "../../../Redux/store";

const ChatGroup = () => {
  const [avatar, setavatar] = useState("");
  const [name, setname] = useState("");
  const [status, setstatus] = useState("");
  const Selector = useSelector(
    (state: RootState) => state.settingGroup.ShowContactList
  );
  const { id } = useParams();
  const dispatch = useDispatch();

  dispatch(getID(id));
  useEffect(() => {
    dispatch(getContactData());
  }, [dispatch]);

  useEffect(() => {
    const GetGroupData = async () => {
      const req = await axios.get(`${baseURL}${GROUPS}/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const res = await req.data.group;
      setavatar(res.avatar);
      setname(res.name);
      setstatus(res.status);
    };
    GetGroupData();
  }, [id]);

  // ** --------- ReduxSlice ---------
  const isSidebar = useSelector((state: RootState) => state.app.isSidebarOpen);
  return (
    <div
      className={`w-[30%] relative flex-auto bg-[#EDEBEF] max-w-full flex flex-col overflow-hidden ${
        isSidebar ? "rounded-r-lg" : "rounded-r-2xl"
      }`}
    >
      {/* HEADER */}
      <HeaderChat id={id} nameChat={name} lastSeen={status} icons={TbPhoto} />
      {/* MSG */}
      <ContainerMSG>
        <SendMSGContent>
          Durante una calda giornata estiva, mentre il sole splendeva alto nel
          cielo azzurro e il profumo dei fiori riempiva l'aria, ho deciso di
          fare una lunga passeggiata lungo il lungomare, attraversando le
          stradine strette e acciottolate del vecchio quartiere
        </SendMSGContent>
        <ReceivedMSGContent>
          fermandomi di tanto in tanto per ammirare gli antichi edifici e le
          pittoresche piazze che mi circondavano, assaporando ogni momento di
          quella magica atmosfera che solo una città storica può offrire
        </ReceivedMSGContent>
      </ContainerMSG>

      {Selector && (
        <div
          className="
      bg-white
      absolute bottom-[0%] left-[0%]
      z-[999]
      w-[100%] h-[100%] overflow-y-auto m-auto
      flex items-center justify-center
      opacity-[0.98]
      "
        >
          <div className="w-[50%] h-[50%] overflow-y-auto m-auto  z-[999]">
            <CheckListContact />
          </div>
        </div>
      )}

      {/* INPUT */}
      <div className="flex-1 flex flex-col justify-end">
        <ChatInput />
      </div>
    </div>
  );
};

export default ChatGroup;
