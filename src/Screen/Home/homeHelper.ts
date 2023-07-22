
import { sampleQueries } from "../../Constants/sampleQueries";
import { table1, table2, table3, table4, table5 } from "../../Constants/table";

export const queryToTableMap: QueryTable = {
  [sampleQueries[0]]: table1,
  [sampleQueries[1]]: table2,
  [sampleQueries[2]]: table3,
  [sampleQueries[3]]: table4,
  [sampleQueries[4]]: table5,
};

export const queryHistory: QueryTable = {};

type QueryTable = { [key: string]: Table };

type Table = {
  data: string[][];
  columnsHeader: string[];
}