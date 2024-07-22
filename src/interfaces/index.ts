import { TypeName } from "../types";
import { IconType } from "react-icons";

export interface IOtpInput {
  id?: string | undefined;
  type: string;
  label: string;
  name: TypeName;
}
export interface IContactMessage {
  id?: string | undefined;
  link?: string;
  nameChat: string;
  lastMessage: string;
  timeMessage: string;
  icons: IconType;
}
export interface IProfile {
  avatar?: string|null;
  mobile?: string;
  name?: string|null;
  my_status?: string;
}
export interface IconsSide {
  id?: string | undefined;
  icon: IconType;
  link?: string;
  logout?: () => Promise<void>;
}
export interface IForm {
  otp?: string;
  mobile_number?: string;
  fcm_token?: string;
}

export interface CallsPhone {
  id?: string | undefined;
  name: string;
  time: string;
  icons: IconType;
  link: string | undefined;
}

export interface MSGFormat {
  id?: string | undefined;
  name: string;
  time: string;
  icons: IconType;
  message: string;
}

export interface IUser {
  name?:string;
  mobile?:string;
  my_status?:string;
  avatar?:string;
}
export interface IGroups {
  id:string;
  name:string;
  status:string;
  created_at:string
  item:object[]
}

export interface IContact {
  phone?: string;
  mobile?: string;
  name?: string;
  my_status?: string;
  avatar?: string;
}