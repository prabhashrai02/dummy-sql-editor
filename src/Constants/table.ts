import table1Data from "./table1.json";
import table2Data from "./table2.json";
import table3Data from "./table3.json";
import table4Data from "./table4.json";
import table5Data from "./table5.json";
import table6Data from "./table6.json";
import table7Data from "./table7.json";
import table8Data from "./table8.json";
import table9Data from "./table9.json";
import table10Data from "./table10.json";

export const tables: QueryTable = {
  table1: table1Data,
  table2: table2Data,
  table3: table3Data,
  table4: table4Data,
  table5: table5Data,
  table6: table6Data,
  table7: table7Data,
  table8: table8Data,
  table9: table9Data,
  table10: table10Data,
};

export type QueryTable = { [key: string]: Table };

export type Table = {
  data: string[][];
  columnsHeader: string[];
};
