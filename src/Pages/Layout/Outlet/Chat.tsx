import { TbPhoto } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import HeaderChat from "../../../Components/ui/HeaderChat";
import ChatInput from "../../../Components/ui/ChatInput/ChatInput";
import ContainerMSG from "../../../Components/ui/ContainerMSG";
import ReceivedMSGContent from "../../../Components/ui/ReceivedMSGContent";
import SendMSGContent from "../../../Components/ui/SendMSGContent";
import { useParams } from "react-router-dom";
import { RootState } from "../../../Redux/store";
import { EditContactByMobile } from "../../../Redux/GetContaceChat/SliceGetContact";
import { useEffect } from "react";
import { IContact } from "../../../interfaces";

const Chat = () => {
  const { mobile } = useParams();
  const dispatch = useDispatch();

  // ------- Get Data ---------
useEffect(() => {
  if (typeof mobile === "string") {
    dispatch(EditContactByMobile(mobile));
  }
}, [dispatch, mobile]);
  // ** --------- ReduxSlice ---------
  const isSidebar = useSelector((state: RootState) => state.app.isSidebarOpen);
  const User: IContact = useSelector(
    (state: RootState) => state.userChat.getContactByPhone
  );
  const isLoading = useSelector(
    (state: RootState) => state.userChat.isLoading
  );
  return (
    <div
      className={`w-[30%] flex-auto bg-[#EDEBEF] max-w-full flex flex-col overflow-hidden ${
        isSidebar ? "rounded-r-lg" : "rounded-r-2xl"
      }`}
    >
      {/* HEADER */}
      <HeaderChat
        nameChat={User?.name}
        lastSeen={User?.my_status}
        icons={TbPhoto}
        isLoading={isLoading}
      />
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
      {/* INPUT */}
      <div className="flex-1 flex flex-col justify-end">
        <ChatInput />
      </div>
    </div>
  );
};

export default Chat;
