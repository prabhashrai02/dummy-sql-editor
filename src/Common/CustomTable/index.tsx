import { memo } from "react";

import ReactTable from "./ReactTable";

import styles from "./customTable.module.css";

const CustomTable = ({ columns, data, resultIsLoading }: CustomTableProps) => {
  return (
    <div className={styles.resultContainer}>
      <div className={styles.head}>Result / Output</div>
      <div className={styles.loader}>
        {resultIsLoading && <div>Loading...</div>}
      </div>
      <div className={styles.result}>
        {!resultIsLoading && data && data.length > 0 && (
          <ReactTable data={data} columnsArray={columns} />
        )}
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
