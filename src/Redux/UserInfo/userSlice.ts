import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'




export const fetchUserData= createAsyncThunk(
  'userInfo/fetchUserData',
  
  async () => {
try {
  const req = await axios.get("https://cvoxxmpp.dev.itvalues.site/CVOX-WS/api/v1/my_profile",{
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("token")
    }

  }
)
const response = await req.data
return response
} catch (error) {
    console.log(error + "an Un expect Error")
}
  },
)

const UserInfo = createSlice({
  name: 'userInfo',
  initialState:{
    record:{}
  },
  reducers: {},
  extraReducers(builder) {
    builder
     .addCase(fetchUserData.fulfilled, (state, action) => {
        state.record = action.payload
      })
  },
})
export default UserInfo.reducer