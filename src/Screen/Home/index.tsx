import Card from "../../Common/Card";
import CodeEditor from "../../Common/CodeEditor";
import CustomTable from "../../Common/CustomTable";
import ScrollableList from "../../Common/ScrollableList";

import { sampleQueries } from "../../Constants/sampleQueries";

import { useHome } from "./useHome";

import styles from "./home.module.css";

const Home = () => {
  const {
    tableData,
    inputCode,
    tableHeader,
    isExecuting,
    historyItems,
    setInputCode,
    runCodeClick,
    cancelCodeClick,
    clearInitialCode,
    onclearHistoryClick,
  } = useHome();

  return (
    <div className={styles.homepageContainer}>
      <div className={styles.sidebar}>
        <Card>
          <ScrollableList
            title="Sample Queries"
            items={sampleQueries}
            onItemClick={(item) => setInputCode(item)}
          />
        </Card>
        <Card>
          <ScrollableList
            title="History"
            onClearClick={onclearHistoryClick}
            items={historyItems}
            onItemClick={(item) => setInputCode(item)}
          />
        </Card>
      </div>
      <div className={styles.codingArea}>
        <Card>
          <CodeEditor
            initialCode={inputCode}
            onClearButtonClick={clearInitialCode}
            onRunButtonClick={(code) => runCodeClick(code)}
            onCancleButtonClick={cancelCodeClick}
            isExecuting={isExecuting}
          />
        </Card>
        <Card>
          <CustomTable
            resultIsLoading={isExecuting}
            columns={tableHeader}
            data={tableData}
          />
        </Card>
      </div>
    </div>
  );
};

export default Home;