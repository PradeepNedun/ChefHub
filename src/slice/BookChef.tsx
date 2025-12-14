import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initState = {
  selectedChef: {}
};

const chefSlice = createSlice({
  name: "chef",
  initialState: initState,
  reducers: {
    setSelectedChef(state, action: PayloadAction<any>) {
      state.selectedChef = action.payload;
    }
    // resetUser: () => userInitialState,
  },
});

export const { setSelectedChef } = chefSlice.actions;
export default chefSlice.reducer;
