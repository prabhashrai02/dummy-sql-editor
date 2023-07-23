import { initialHistoryItems } from "./homeHelper";

export const initialState: ReducerState = {
  inputCode: "",
  isExecuting: false,
  historyItems: initialHistoryItems,
  tableData: [],
  tableHeader: [],
};

export const enum Actions {
  SET_INPUT_CODE = "SET_INPUT_CODE",
  SET_IS_EXECUTING = "SET_IS_EXECUTING",
  SET_HISTORY_ITEMS = "SET_HISTORY_ITEMS",
  SET_TABLE_DATA = "SET_TABLE_DATA",
  SET_TABLE_HEADER = "SET_TABLE_HEADER",
}

export const reducer = (state: typeof initialState, action: ActionType) => {
  switch (action.type) {
    case Actions.SET_INPUT_CODE:
      return { ...state, inputCode: action.payload };
    case Actions.SET_IS_EXECUTING:
      return { ...state, isExecuting: action.payload };
    case Actions.SET_HISTORY_ITEMS:
      return { ...state, historyItems: action.payload };
    case Actions.SET_TABLE_DATA:
      return { ...state, tableData: action.payload };
    case Actions.SET_TABLE_HEADER:
      return { ...state, tableHeader: action.payload };
    default:
      return state;
  }
};

type ActionType =
  | { type: Actions.SET_INPUT_CODE; payload: string }
  | { type: Actions.SET_IS_EXECUTING; payload: boolean }
  | { type: Actions.SET_HISTORY_ITEMS; payload: string[] }
  | { type: Actions.SET_TABLE_DATA; payload: string[][] }
  | { type: Actions.SET_TABLE_HEADER; payload: string[] };

type ReducerState = {
  inputCode: string;
  isExecuting: boolean;
  historyItems: string[];
  tableData: string[][];
  tableHeader: string[];
};
