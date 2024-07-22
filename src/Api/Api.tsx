import axios from "axios";
export const baseURL = "https://cvoxxmpp.dev.itvalues.site/CVOX-WS/api/v1";
export const LOGIN = "/login";
export const OTP = "/verify-otp";
export const LOGOUT = "/logout";
export const getPROFILE = "/my_profile";
export const GROUPS = "/groups";
export const editGroup = "/groups/edit/";
export const Create = "/create";
export const addMembers = "/add_members";
export const contacts = "/contacts";
export const editProfile = "/ChangeName";
export const ChangeAvatar = "/ChangeAvatar";
export const GENERATE = "/generate-qr-code";
export const User = "/user";
const token = localStorage.getItem("token");

export const axiosApi = axios.create({
  baseURL: baseURL ,
  headers: {
    Authorization: "Bearer " + token,
  },
});



