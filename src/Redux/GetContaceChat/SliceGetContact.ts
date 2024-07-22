/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axiosApi, contacts, User } from "../../Api/Api";
import { IContact } from "../../interfaces";

export const getContactData = createAsyncThunk(
  "userChat/getContactData",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosApi.get(`${contacts}`);
      return res.data.contacts;
    } catch (error: unknown) {
      const errorData = error as Error;
      return rejectWithValue(errorData.message);
    }
  }
);
export const EditContactByMobile = createAsyncThunk(
  "userChat/EditContactByMobile",
  async (mobile, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await axiosApi.get(`${User}/${mobile}`);
      return res.data.user;
    } catch (error: unknown) {
      const errorData = error as Error;
      return rejectWithValue(errorData.message);
    }
  }
);
interface AppState {
  getContact: [];
  loading: boolean;
  isLoading: boolean;
  error: null;
  getContactByPhone: IContact;
}

const initialState: AppState = {
  getContact: [],
  getContactByPhone: {},
  loading: false,
  isLoading: false,
  error: null as null,
};

const contactSlice = createSlice({
  name: "userChat",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getContactData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactData.fulfilled, (state, action) => {
        state.getContact = action.payload;
        state.loading = false;
      })
      .addCase(getContactData.rejected, (state, action) => {
        state.error = action.payload as null;
        state.loading = false;
      })
      // edit
      .addCase(EditContactByMobile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(EditContactByMobile.fulfilled, (state, action) => {
        state.getContactByPhone = action.payload;
        state.isLoading = false;
      })
      .addCase(EditContactByMobile.rejected, (state, action) => {
        state.error = action.payload as null;
        state.isLoading = false;
      });
  },
});

export default contactSlice.reducer;
