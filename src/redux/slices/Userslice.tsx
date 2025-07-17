import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { admindummydata } from '../../utils/admindummydata';
import type { TeamMember } from '../../utils/admintypes';

interface UserState {
  users: TeamMember[];
  selectedUser: TeamMember | null;
}

const initialState: UserState = {
  users: admindummydata,
  selectedUser: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<TeamMember[]>) {
      state.users = action.payload;
    },
    selectUser(state, action: PayloadAction<string>) {
      const user = state.users.find(u => u.id === action.payload) || null;
      state.selectedUser = user;
    },
    addUser(state, action: PayloadAction<TeamMember>) {
      state.users.push(action.payload);
    },
    updateUser(state, action: PayloadAction<TeamMember>) {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
  },
});

export const { setUsers, selectUser, addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
