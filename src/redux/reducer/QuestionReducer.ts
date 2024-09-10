// import { QuestionType } from "@/types/Question";
import { Option } from "@/types/Question";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  activePillar: string;
  allPillar: string[];
  temp: null;
  [key: string]: any;
};

const initialState: InitialStateType = {
  activePillar: "",
  allPillar: [],
  temp: null,
};

export const QuestionSlice = createSlice({
  name: "Question",
  initialState,
  reducers: {
    setPillarName: (state, action) => {
      state.allPillar = action.payload;
    },
    setActivePillar: (state, action) => {
      state.activePillar = action.payload;
    },
    setQuestion: (state, action) => {
      state[action.payload.p] = action.payload.q;
    },
    setAnswer: (
      state,
      action: PayloadAction<{
        qId: number;
        oId: number;
        arr: Option[];
      }>
    ) => {
      state[state.activePillar][action.payload.qId].options[
        action.payload.oId
      ].checked = true;
      action.payload.arr.map((_, index) => {
        if (action.payload.oId !== index) {
          state[state.activePillar][action.payload.qId].options[index].checked =
            false;
        }
      });
    },
    setGettedAnswer: (state, action) => {
      state[action.payload.name] = action.payload.updatedAnswers;
    },
  },
});

export const {
  setPillarName,
  setActivePillar,
  setQuestion,
  setAnswer,
  setGettedAnswer,
} = QuestionSlice.actions;

export default QuestionSlice.reducer;
