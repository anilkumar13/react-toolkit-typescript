import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchAllUsers, deleteUserById, updateUser } from "../api/userApi";
interface INUser {
  name: string;
  email: string;
  phone: string;
  id: number;
}
interface INUserSlice {
  isAuthenticated: boolean;
  role: "admin" | "user" | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  users: INUser[];
}
const initialState: INUserSlice = {
  isAuthenticated: false,
  role: null,
  users: [],
  status: "idle",
  error: null,
};

// Assuming a function to fetch users from an API
export const getAllUsers = createAsyncThunk<INUser[]>(
  "users/fetchUsers",
  async () => {
    const users = await fetchAllUsers();
    return users;
  }
);

export const deleteUser = createAsyncThunk<void, number>(
  "users/deleteUser",
  async (userId) => {
    await deleteUserById(userId);
  }
);

export const updateUserData = createAsyncThunk<INUser, INUser>(
  "users/updateUser",
  async (user) => {
    await updateUser(user);
    return user; // Ensure this is returned if needed
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<"admin" | "user">) => {
      state.isAuthenticated = true;
      state.role = action.payload;
      localStorage.setItem(
        "userData",
        JSON.stringify({ isAuthenticated: true, role: action.payload })
      );
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.role = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user data";
      })
      .addCase(
        getAllUsers.fulfilled,
        (state, action: PayloadAction<INUser[]>) => {
          state.status = "succeeded";
          state.users = action.payload;
          state.error = null;
        }
      )
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter((user) => user.id !== action.meta.arg);
        state.error = null;
      })
      .addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<INUser>) => {
          state.status = "succeeded";
          const updatedUser = action.payload;
          state.users = state.users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          );
          state.error = null;
        }
      );
  },
});
export const { actions, reducer } = userSlice;
export const { login, logout } = actions;
export default reducer;
