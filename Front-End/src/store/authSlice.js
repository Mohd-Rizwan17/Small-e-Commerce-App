import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api, { setAccessToken, refreshSession } from "../api/axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/auth/login", credentials);
      setAccessToken(data.accessToken);
      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Network error, please try again" },
      );
    }
  },
);

export const restoreSession = createAsyncThunk("auth/restore", async () => {
  await refreshSession();
  const { data } = await api.get("/auth/me");
  return data.user;
});

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  try {
    await api.post("/auth/logout");
  } finally {
    setAccessToken(null);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, isInitialised: false },
  reducers: {
    clearAuth: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(restoreSession.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isInitialised = true;
      })
      .addCase(restoreSession.rejected, (state) => {
        state.user = null;
        state.isInitialised = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        state.user = null;
      });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
