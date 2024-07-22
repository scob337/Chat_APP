import { configureStore } from "@reduxjs/toolkit";
import reduxSlice from "./reduxSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import UserInfo from './UserInfo/userSlice'
import addContactSlice from "./AddGroupSlice";
import GroupSettingSlice from "./UserInfo/GroupSettingSlice";
import contactSlice from "./GetContaceChat/SliceGetContact";
export const UseAppDispatch :()=> AppDispatch = useDispatch;

export const UseAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const store = configureStore({
  reducer: {
    app: reduxSlice,   
    user: UserInfo,
    settingGroup: GroupSettingSlice,
    userChat: contactSlice,
    addGroup: addContactSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
