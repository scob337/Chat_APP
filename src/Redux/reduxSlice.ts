import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AppState {
  isSidebarOpen: boolean;
  isEditOpen:string;
  mobile:string;
  isUpdateData:boolean;
}



const initialState: AppState = {
  isSidebarOpen: false,
  isEditOpen: "",
  isUpdateData: false,
  mobile:"",
};

const reduxSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    toggleEdit: (state,actionPayload:PayloadAction<string>) => {
      state.isEditOpen = actionPayload.payload;
      
    },
     updateData: (state) => {
      state.isUpdateData = !state.isUpdateData;
    },
    upDataNumber :(state,actionPayload:PayloadAction<string>) => {
  state.mobile = actionPayload.payload;
    }

// Add Group Setting
  },





});






export const { toggleSidebar, toggleEdit, updateData, upDataNumber } = reduxSlice.actions;

export default reduxSlice.reducer;
