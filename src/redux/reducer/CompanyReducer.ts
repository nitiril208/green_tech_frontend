import { createSlice } from "@reduxjs/toolkit";

export const UserSlice = createSlice({
  name: "User",
  initialState: {
    UserId: "",
    clientId: "",
    targetAudienceId: "",
    CompanyId: "",
    role: "",
  },
  reducers: {
    setUserData: (state, action) => {
      state.UserId = action.payload;
    },
    setCompanyId: (state, action) => {
      state.CompanyId = action.payload;
    },
    setClientId: (state, action) => {
      state.clientId = action.payload;
    },
    setClientRole: (state, action) => {
      state.role = action.payload;
    },
  },
});

export const { setUserData, setClientId, setCompanyId, setClientRole } = UserSlice.actions;

export default UserSlice.reducer;
