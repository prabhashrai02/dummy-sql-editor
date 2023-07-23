import { useEffect, useRef, useReducer } from "react";

import {
  deleteLocalStorageData,
  setLocalStorageData,
} from "../../Utils/storageUtils";

import { tables } from "../../Constants/table";
import { HISTORY_STORAGE_KEY } from "../../Constants/localStorageKeys";

import { queryHistory, sampleQuery } from "./homeHelper";
import { Actions, initialState, reducer } from "./reducer";

export const useHome = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { inputCode, isExecuting, historyItems, tableData, tableHeader } = state;

  const latestTableData = useRef<string[][]>(tables.table6.data);
  const latestTableHeader = useRef<string[]>(tables.table6.columnsHeader);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    latestTableData.current = tableData;
    latestTableHeader.current = tableHeader;
  }, [tableData, tableHeader]);

  const updateTableState = (data: string[][], header: string[]) => {
    setTableData(data);
    setTableHeader(header);
  };

  const fetchTableData = (code: string) => {
    let data: string[][] = [];
    let header: string[] = [];

    if (sampleQuery[code]) {
      data = sampleQuery[code].data;
      header = sampleQuery[code].columnsHeader;
    } else if (queryHistory[code]) {
      data = queryHistory[code].data;
      header = queryHistory[code].columnsHeader;
    } else {
      const randomTableNumber = Math.floor(Math.random() * 5) + 6;
      const randomTable = `table${randomTableNumber}`;
      data = tables[randomTable].data;
      header = tables[randomTable].columnsHeader;
    }

    return { data, header };
  };

  const runCodeClick = (code: string) => {
    if (code.trim() === "") return;

    setIsExecuting(true);
    const { data, header } = fetchTableData(code);
    updateTableState(data, header);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setIsExecuting(false);

      if (!queryHistory[code]) {
        setHistoryItems([ ...historyItems, code]);
        queryHistory[code] = {
          data: latestTableData.current,
          columnsHeader: latestTableHeader.current,
        };
        setLocalStorageData(HISTORY_STORAGE_KEY, queryHistory);
      }

      timerRef.current = null;
    }, 1000);
  };

  const cancelCodeClick = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      setIsExecuting(false);
      timerRef.current = null;
    }
  };

  const onclearHistoryClick = () => {
    setHistoryItems([]);
    deleteLocalStorageData(HISTORY_STORAGE_KEY);
  };

  
  const setInputCode = (code: string) => {
    dispatch({ type: Actions.SET_INPUT_CODE, payload: code });
  };

  const setIsExecuting = (isExecuting: boolean) => {
    dispatch({ type: Actions.SET_IS_EXECUTING, payload: isExecuting });
  };

  const setTableData = (data: string[][]) => {
    dispatch({ type: Actions.SET_TABLE_DATA, payload: data });
  };

  const setTableHeader = (header: string[]) => {
    dispatch({ type: Actions.SET_TABLE_HEADER, payload: header });
  };

  const setHistoryItems = (items: string[]) => {
    dispatch({ type: Actions.SET_HISTORY_ITEMS, payload: items });
  };

  return {
    tableData,
    inputCode,
    tableHeader,
    isExecuting,
    historyItems,
    setInputCode,
    runCodeClick,
    cancelCodeClick,
    onclearHistoryClick,
  };
};
