
import { HISTORY_STORAGE_KEY } from "../../Constants/localStorageKeys";
import { sampleQueries } from "../../Constants/sampleQueries";
import { QueryTable, tables } from "../../Constants/table";

import { getLocalStorageData } from "../../Utils/storageUtils";

export const sampleQuery: QueryTable = {
  [sampleQueries[0]]: tables.table1,
  [sampleQueries[1]]: tables.table2,
  [sampleQueries[2]]: tables.table3,
  [sampleQueries[3]]: tables.table4,
  [sampleQueries[4]]: tables.table5,
};


const initialQueryHistoryData = getLocalStorageData<QueryTable>(HISTORY_STORAGE_KEY) || {};

export const queryHistory: QueryTable = initialQueryHistoryData;

export const initialHistoryItems = Object.keys(initialQueryHistoryData);
