import InputDropdown from "../InputDropdown";
import useCodeEditor from "./useCodeEditor";

import styles from "./codeEditor.module.css";

const CodeEditor = (props: CodeEditorProps) => {
  const { initialCode, isExecuting, onRunButtonClick, onCancleButtonClick } =
    props;

  const {
    code,
    themeOptions,
    selectedTheme,
    textAreaRef,
    lineNumberRef,
    isButtonDisable,
    onClearEditor,
    handleCodeChange,
    handleScroll,
    handleThemeChange,
  } = useCodeEditor(initialCode, "darkTheme");

  return (
    <div>
      <div className={styles.toolbar}>
        <InputDropdown
          label={"Theme"}
          labelPosition="left"
          selectedOption={selectedTheme}
          options={themeOptions}
          onOptionChange={handleThemeChange}
        />
        <div className={styles.buttonContainer}>
          {isExecuting ? (
            <button
              className={styles.cancelButton}
              onClick={onCancleButtonClick}
            >
              Cancel
            </button>
          ) : (
            <button
              disabled={isButtonDisable}
              className={styles.runButton}
              onClick={() => onRunButtonClick(code)}
              >
              Run
            </button>
          )}

          <button disabled={isButtonDisable} className={styles.clearButton} onClick={onClearEditor}>
            Clear
          </button>
        </div>
      </div>
      <div className={`${styles.codeEditor} ${styles[selectedTheme]}`}>
        <div ref={lineNumberRef} className={styles.lineNumbers}>
          {code.split("\n").map((_, index) => (
            <div key={index} className={styles.lineNumber}>
              {index + 1}
            </div>
          ))}
        </div>
        <textarea
          ref={textAreaRef}
          className={styles.codeTextArea}
          value={code}
          onChange={handleCodeChange}
          onScroll={handleScroll}
          placeholder="Enter your query here..."
        />
      </div>
    </div>
  );
};

type CodeEditorProps = {
  initialCode?: string;
  onRunButtonClick: (code: string) => void;
  onCancleButtonClick: () => void;
  isExecuting: boolean;
};

export default CodeEditor;
