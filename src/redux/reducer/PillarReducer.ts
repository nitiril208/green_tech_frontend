import { createSlice } from "@reduxjs/toolkit";

interface piller {
	maturitypillar: any;
}


export const PillarSlice = createSlice({

  name: "pillars",
  initialState: {
    maturitypillar: [],
    
  },
  reducers: {
    setMaturitypillar: (state, action) => {
      state.maturitypillar = action.payload;
    },
    setPillars: (state :piller , action) => {
    
      // state.maturitypillar?.find((i) => i.pillarid === action.payload.id)?.checked = action.payload.checked
      // state.maturitypillar?.find((i) => i.pillarid === action.payload.id)?.checked = action.payload.checked

      state.maturitypillar = state.maturitypillar.map((i :any) => {
        if (i?.pillarid === action?.payload.id) {
          return {
            ...i,
            checked: action.payload.checked
          }
        }
        return i
      }) 

    

      // state.pillars = action.payload;
    },
  },
});

export const { setPillars, setMaturitypillar } = PillarSlice.actions;
export default PillarSlice.reducer;
