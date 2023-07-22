import { historyItems, queryHistory, queryToTableMap } from "./homeHelper";

import { useState } from "react";
import { table6 } from "../../Constants/table";

export const useHome = () => {
  const [inputCode, setInputCode] = useState("");
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const [historyItems, setHistoryItems] = useState<string[]>([]);

  const [tableData, setTableData] = useState<string[][]>(table6.data);
  const [tableHeader, setTableHeader] = useState<string[]>(
    table6.columnsHeader
  );

  const runCodeClick = (code: string) => {
    setIsExecuting(true);

    const tempTimer = setTimeout(() => {
      if (queryToTableMap[code]) {
        const data = queryToTableMap[code].data;
        const header = queryToTableMap[code].columnsHeader;
        setTableData(data);
        setTableHeader(header);
      }

      setIsExecuting(false);
      setTimer(null);

      if (!historyItems.includes(code)) {
        setHistoryItems((prevHistoryItems) => [...prevHistoryItems, code]);
      }
    }, 1000);

    setTimer(tempTimer);
  };

  const cancelCodeClick = () => {
    if (timer) {
      clearTimeout(timer);
      setIsExecuting(false);
      setTimer(null);
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
