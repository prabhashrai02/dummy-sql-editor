import { memo } from "react";

import ReactTable from "./ReactTable";
import Loader from "../Loader";

import styles from "./customTable.module.css";

const CustomTable = ({ columns, data, resultIsLoading }: CustomTableProps) => {

  const isDataEmpty = !columns.length || !data.length;
  const queryMessage = "Please run a query to get the result.";

  return (
    <div className={styles.resultContainer}>
      <div className={styles.head}>Result / Output</div>
      <div className={styles.loader}>
        {resultIsLoading && <Loader />}
        {!resultIsLoading && isDataEmpty && <b className={styles.queryMessage}>{queryMessage}</b>}
      </div>
      <div className={styles.result}>
        {!resultIsLoading && !isDataEmpty && <ReactTable data={data} columnsArray={columns} />}
      </div>
    </div>
  );
};

type CustomTableProps = {
  columns: string[];
  data: (string | number)[][];
  resultIsLoading: boolean;
};

export default memo(CustomTable);
