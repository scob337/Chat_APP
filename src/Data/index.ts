import { TbLogout } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import {
  IContactMessage,
  IOtpInput,
  IconsSide,
  CallsPhone,
  MSGFormat,
} from "../interfaces";
import { v4 as uuid } from "uuid";
import { AiFillMessage } from "react-icons/ai";
import { GrGroup, GrNotification } from "react-icons/gr";
import { PiPhoneCall } from "react-icons/pi";
import { CiLock } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { LOGOUT, axiosApi, baseURL } from "../Api/Api";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

export const optInput: IOtpInput[] = [
  {
    id: uuid(),
    name: "otp",
    type: "text",
    label: "OTP",
  },
  {
    id: uuid(),
    name: "mobile_number",
    type: "text",
    label: "Numero di cellulare",
  },
  {
    id: uuid(),
    name: "fcm_token",
    type: "text",
    label: "fcm_token",
  },
];
export const iconsSide: IconsSide[] = [
  {
    id: uuid(),
    icon: FaUser,
    link: "/edit",
  },
];
export const iconsSideMiddle: IconsSide[] = [
  {
    id: uuid(),
    icon: AiFillMessage,
    link: "/chat",
  },
  {
    id: uuid(),
    icon: GrGroup,
    link: "/groups",
  },
  {
    id: uuid(),
    icon: PiPhoneCall,
    link: "/phonecalls",
  },
  {
    id: uuid(),
    icon: GrNotification,
    link: "/notifications",
  },
  {
    id: uuid(),
    icon: CiLock,
    link: "/notifications",
  },
];

// ------Function--------
  const MySwal = withReactContent(Swal)
const logOut = async (): Promise<void> => {
  try {
    const res = await axiosApi.post(`${baseURL}${LOGOUT}`);
    localStorage.removeItem("token");
    await  MySwal.fire({
      title: `${res.data.message}`,
    });
    window.location.pathname = "/sign-in";
  } catch (err: unknown) {
    const errorData = err as Error;
    await MySwal.fire({
      title: `${errorData.message}`,
    });
  }
};
export const iconsSideLast: IconsSide[] = [
  {
    id: uuid(),
    icon: IoSettingsOutline,
    link: "/settings",
  },
  {
    id: uuid(),
    icon: TbLogout,
    logout: logOut,
  },
];
export const iconsProfile: IconsSide[] = [
  {
    id: uuid(),
    icon: FaUser,
  },
  {
    id: uuid(),
    icon: FaUser,
  },
  {
    id: uuid(),
    icon: FaUser,
  },
  {
    id: uuid(),
    icon: FaUser,
  },
  {
    id: uuid(),
    icon: FaUser,
  },
];
export const contactMessage: IContactMessage[] = [
  {
    id: uuid(),
    nameChat: "Mohamed Naguib",
    link: "chat",
    lastMessage: "Ciao, come va?",
    timeMessage: "10:22 PM",
    icons: FaUser,
  },
  {
    id: uuid(),
    nameChat: "Ahmed Mohamed",
    link: "chat",
    lastMessage: "Buongiorno",
    timeMessage: "5:22 PM",
    icons: FaUser,
  },
  {
    id: uuid(),
    nameChat: "Shreef",
    link: "chat",
    lastMessage: "Ciao, come va?",
    timeMessage: "10:22 PM",
    icons: FaUser,
  },
  {
    id: uuid(),
    nameChat: "Gasser",
    link: "chat",
    lastMessage: "Buongiorno",
    timeMessage: "5:22 PM",
    icons: FaUser,
  },
  {
    id: uuid(),
    nameChat: "Kareem",
    link: "chat",
    lastMessage: "Ciao, come va?",
    timeMessage: "10:22 PM",
    icons: FaUser,
  },
  {
    id: uuid(),
    nameChat: "Ahmed",
    link: "chat",
    lastMessage: "Buongiorno",
    timeMessage: "5:22 PM",
    icons: FaUser,
  },
  {
    id: uuid(),
    nameChat: "Naguib",
    link: "/chat",
    lastMessage: "Ciao, come va?",
    timeMessage: "10:22 PM",
    icons: FaUser,
  },
  {
    id: uuid(),
    nameChat: "Mohamed",
    link: "/chat",
    lastMessage: "Mio fratello: Buongiorno",
    timeMessage: "5:22 PM",
    icons: FaUser,
  },
];
export const GroupMessage: IContactMessage[] = [
  {
    id: uuid(),
    nameChat: "La famiglia",
    lastMessage: "Mio fratello: Ciao, come va?",
    timeMessage: "10:22 PM",
    icons: FaUser,
    link:"chat"
  },
  {
    id: uuid(),
    nameChat: "Il team di lavoro",
    lastMessage: "Mohamed: Buongiorno",
    timeMessage: "10:22 PM",
    icons: FaUser,
    link:"chat"

  },
  {
    id: uuid(),
    nameChat: "I vicini di casa",
    lastMessage: "Kareem :Buongiorno",
    timeMessage: "5:22 PM",
    icons: FaUser,
    link:"chat"

  },
  {
    id: uuid(),
    nameChat: "Gli amici",
    lastMessage: "Ibrahem: Buongiorno",
    timeMessage: "5:22 PM",
    icons: FaUser,
    link:"chat"

  },

  {
    id: uuid(),
    nameChat: "Il lavoro",
    lastMessage: "Shref: Ciao, come va?",
    timeMessage: "10:22 PM",
    icons: FaUser,
    link:"chat"

  },
  {
    id: uuid(),
    nameChat: "Il gruppo",
    lastMessage: "Ahmed: Buongiorno",
    timeMessage: "5:22 PM",
    icons: FaUser,
    link:"chat"

  },
  {
    id: uuid(),
    nameChat: "Il team di lavoro",
    lastMessage: "Mohamed: Buongiorno",
    timeMessage: "10:22 PM",
    icons: FaUser,
    link:"chat"

  },
  {
    id: uuid(),
    nameChat: "I vicini di casa",
    lastMessage: "Kareem :Buongiorno",
    timeMessage: "5:22 PM",
    icons: FaUser,
    link:"chat"

  },
];

export const PhoneCall: CallsPhone[] = [
  {
    id: uuid(),
    name: "Mohamed Naguib",
    time: "10:22",
    icons: FaUser,
    link:"/phonecalls"
  },
  {
    id: uuid(),
    name: "Mohamed Naguib",
    time: "10:22",
    icons: FaUser,
    link:"/phonecalls"
  },
  {
    id: uuid(),
    name: "Hossam Shaban",
    time: "10:59",
    icons: FaUser,
    link:"/phonecalls"

  },
  {
    id: uuid(),
    name: "Hossam Shaban",
    time: "10:59",
    icons: FaUser,
    link:"/phonecalls"

  },
  {
    id: uuid(),
    name: "Sherif Abd El-qader",
    time: "12:22",
    icons: FaUser,
    link:"/phonecalls"

  },
  {
    id: uuid(),
    name: "Sherif Abd El-qader",
    time: "12:22",
    icons: FaUser,
    link:"/phonecalls"

  },
  {
    id: uuid(),
    name: "Abd El-Tawab Shaaban",
    time: "17:03",
    icons: FaUser,
    link:"/phonecalls"

  },
  {
    id: uuid(),
    name: "Abd El-Tawab Shaaban",
    time: "17:03",
    icons: FaUser,
    link:"/phonecalls"

  },
  {
    id: uuid(),
    name: "Abdullah Ismael",
    time: "18:00",
    icons: FaUser,
    link:"/phonecalls"

  },
  {
    id: uuid(),
    name: "Abdullah Ismael",
    time: "18:00",
    icons: FaUser,
    link:"/phonecalls"

  },
];

export const ReciveMSG: MSGFormat[] = [
  {
    id: uuid(),
    name: "Mohamed Naguib",
    time: "10:22",
    icons: FaUser,
    message: "Hello World !",
  },

  {
    id: uuid(),
    name: "Mohamed Naguib",
    time: "10:22",
    icons: FaUser,
    message: "Lets Gooooooooooo oooooo",
  },

  {
    id: uuid(),
    name: "Mohamed Naguib",
    time: "10:22",
    icons: FaUser,
    message: "Hello World !",
  },
];

export const SendMSG: MSGFormat[] = [
  {
    id: uuid(),
    name: "Mohamed Naguib",
    time: "10:22",
    icons: FaUser,
    message: "Hello World !",
  },
];
