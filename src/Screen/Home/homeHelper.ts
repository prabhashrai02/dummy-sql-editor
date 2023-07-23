
import { HISTORY_STORAGE_KEY } from "../../Constants/localStorageKeys";
import { sampleQueries } from "../../Constants/sampleQueries";
import { tables } from "../../Constants/table";

import { getLocalStorageData } from "../../Utils/storageUtils";

export const sampleQuery: QueryHistory = {
  [sampleQueries[0]]: "table1",
  [sampleQueries[1]]: "table2",
  [sampleQueries[2]]: "table3",
  [sampleQueries[3]]: "table4",
  [sampleQueries[4]]: "table5",
};

export const getTableFromName = (tableName: string) => {
  return tables[tableName];
}

const initialQueryHistoryData = getLocalStorageData<QueryHistory>(HISTORY_STORAGE_KEY) || {};

export const queryHistory: QueryHistory = initialQueryHistoryData;

export const initialHistoryItems = Object.keys(initialQueryHistoryData);

type QueryHistory = {
  [key: string]: string;
}