/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { axiosApi, contacts, GROUPS, addMembers } from "../Api/Api";

export const getContactData = createAsyncThunk(
  "addGroup/getContactData",
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
export const addContactGroup = createAsyncThunk(
  "addGroup/addContactGroup",
  async (AddContact, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const id = getState().addGroup.groupById;
      const res = await axiosApi.post(`${GROUPS}/${id}${addMembers}`, {
        members: AddContact,
      });
      alert("Done")
      console.log(AddContact)
      return res.data;
    } catch (error: unknown) {
      const errorData = error as Error;
      return rejectWithValue(errorData.message);
    }
  }
);

interface AppState {
  getContact: [];
  AddContact: [];
  loading: boolean;
  groupById: string;
  isLoading: boolean;
  error: null;
}

const initialState: AppState = {
  getContact: [],
  AddContact: [],
  groupById: "",
  loading: false,
  isLoading: false,
  error: null as null,
};
const addContactSlice = createSlice({
  name: "addGroup",
  initialState,
  reducers: {
    getID: (state, action: PayloadAction<string>) => {
      state.groupById = action.payload;
    },
    selectPerson: (state, action:PayloadAction<string>) => {
      if (!state.AddContact.includes(action.payload)) {
        state.AddContact.push(action.payload);
        // [...state.AddContact,action.payload];
      }
    },
    deselectPerson: (state, action:PayloadAction<string>) => {
      state.AddContact = state.AddContact.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Get
      .addCase(getContactData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getContactData.fulfilled, (state,action) => {
        state.getContact = action.payload;
        state.loading = false;
      })
      .addCase(getContactData.rejected, (state, action) => {
        state.error = action.payload as null;
        state.loading = false;
      })

      // Add
      .addCase(addContactGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContactGroup.fulfilled, (state) => {
        state.AddContact = [];
        state.loading = false;
      })
      .addCase(addContactGroup.rejected, (state, action) => {
        state.error = action.payload as null;
        state.loading = false;
      });
  },
});
export const { getID, selectPerson, deselectPerson } = addContactSlice.actions;

export default addContactSlice.reducer;
