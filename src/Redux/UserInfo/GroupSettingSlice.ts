import {createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosApi, contacts } from "../../Api/Api";


export const fetchContactGroups= createAsyncThunk(
  
  'settingGroup/fetchContactGroups',
  async (_,thunkAPI) => {
    const {rejectWithValue} =thunkAPI

try {

  const res = await axiosApi.get(contacts)



const response = await res.data
return response

} catch (error) {
  rejectWithValue(error)
}
  },
)

// Group Setting
interface IGroupSetting{
    EditGroup:boolean;
    SendMessage:boolean;
    AddOtherMember:boolean;
    ApproveNewMember:boolean;
    EditGroupAdmins:boolean;
    // Side Group
    SideInfo:[];
    contactMembers:[];
    ShowContactList:boolean
    // Side Group
  }
  
  const GroupSetting:IGroupSetting = {
    EditGroup:true,
    SendMessage:true,
    AddOtherMember:true,
    ApproveNewMember:false,
    EditGroupAdmins:false,

    // Side Group

    SideInfo:[

    ],
    ShowContactList:false ,
    contactMembers:[],


    // Side Group
  
  }
  

  const GroupSettingSlice = createSlice({
    name: "settingGroup",
    initialState:GroupSetting,
    reducers: {
      toggleEditGroup: (state) => {
        state.EditGroup = !state.EditGroup;
        console.log(state.SendMessage)
      },
      toggleSendMessage: (state) => {
        state.SendMessage = !state.SendMessage;
      },
        ToggleAddOtherMember: (state) => {
        state.AddOtherMember = !state.AddOtherMember;
      },
      ToggleApproveNewMember: (state) => {
        state.ApproveNewMember = !state.ApproveNewMember;
      },
      ToggleEditGroupAdmins: (state) => {
        state.EditGroupAdmins = !state.EditGroupAdmins;
      },


      PushAsideInfo :(state, action) =>{
        state.SideInfo = action.payload;
      },
      GetContactMembers:(state, action) =>{
        state.contactMembers = action.payload
      },

      ToggleShowContactList:(state , action)=>{
        state.ShowContactList = action.payload
      }

    },

    extraReducers(builder) {
      builder
      .addCase(fetchContactGroups.pending, () => {
      })

      builder
      .addCase(fetchContactGroups.fulfilled, (state, action) => {
        state.contactMembers=action.payload
      })
      builder
      .addCase(fetchContactGroups.rejected, (error) => {
        console.log(error)
      })





    }

  // Group Setting



    



  });


  export const {ToggleShowContactList,GetContactMembers,PushAsideInfo, toggleEditGroup,toggleSendMessage,ToggleAddOtherMember,ToggleApproveNewMember,ToggleEditGroupAdmins } = GroupSettingSlice.actions;

  export default GroupSettingSlice.reducer;
  