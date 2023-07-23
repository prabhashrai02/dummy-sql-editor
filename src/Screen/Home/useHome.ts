import { useEffect, useState, useRef } from "react";

import { setLocalStorageData } from "../../Utils/storageUtils";

import { tables } from "../../Constants/table";
import { HISTORY_STORAGE_KEY } from "../../Constants/localStorageKeys";

import { initialHistoryItems, queryHistory, sampleQuery } from "./homeHelper";

export const useHome = () => {
  const [inputCode, setInputCode] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [historyItems, setHistoryItems] = useState<string[]>(initialHistoryItems);

  const [tableData, setTableData] = useState<string[][]>([]);
  const [tableHeader, setTableHeader] = useState<string[]>([]);

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
        setHistoryItems((prevHistoryItems) => [...prevHistoryItems, code]);
        queryHistory[code] = { data: latestTableData.current, columnsHeader: latestTableHeader.current };
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

  return {
    tableData,
    inputCode,
    tableHeader,
    isExecuting,
    historyItems,
    setInputCode,
    runCodeClick,
    cancelCodeClick,
  };
};
