import { memo } from "react";
import ReactTable from "./ReactTable";
import Loader from "../Loader";
import styles from "./customTable.module.css";

const CustomTable = ({ columns, data, resultIsLoading }: CustomTableProps) => {
  const isDataEmpty = !columns.length || !data.length;
  const queryMessage = "Please run a query to get the result.";

  const convertToCSV = (data: (string | number)[][], columns: string[]) => {
    const header = columns.join(",") + "\n";
    const csvContent =
      "data:text/csv;charset=utf-8," +
      header +
      data.map((row) => row.join(",")).join("\n");
    return csvContent;
  };

  const handleExportCSV = () => {
    const csvContent = convertToCSV(data, columns);
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "table_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <div className={styles.resultContainer}>
      <div className={styles.tableHeadContainer}>
        <div className={styles.head}>Result / Output</div>
        {!resultIsLoading && !isDataEmpty && (
          <button className={styles.exportButton} onClick={handleExportCSV}>
            Export to CSV
          </button>
        )}
      </div>
      <div className={styles.loader}>
        {resultIsLoading && <Loader />}
        {!resultIsLoading && isDataEmpty && (
          <b className={styles.queryMessage}>{queryMessage}</b>
        )}
      </div>
      <div className={styles.result}>
        {!resultIsLoading && !isDataEmpty && (
          <>
            <ReactTable data={data} columnsArray={columns} />
          </>
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
