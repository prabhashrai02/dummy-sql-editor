import InputDropdown from "../InputDropdown";
import useCodeEditor from "./useCodeEditor";

import styles from "./codeEditor.module.css";

const CodeEditor = (props: CodeEditorProps) => {
  const { initialCode, isExecuting, onRunButtonClick, onClearButtonClick, onCancleButtonClick } =
    props;

  const {
    code,
    fontSize,
    lineHeight,
    fontOptions,
    themeOptions,
    selectedTheme,
    textAreaRef,
    lineNumberRef,
    isButtonDisable,
    onClearEditor,
    handleCodeChange,
    handleScroll,
    handleThemeChange,
    handleFontSizeChange,
  } = useCodeEditor(initialCode, "darkTheme", onClearButtonClick);

  return (
    <div>
      <div className={styles.toolbar}>
        <div className={styles.dropdownContainer}>
          <InputDropdown
            label={"Theme"}
            labelPosition="left"
            selectedOption={selectedTheme}
            options={themeOptions}
            onOptionChange={handleThemeChange}
          />
          <InputDropdown
            label={"Font Size"}
            labelPosition="left"
            selectedOption={String(fontSize)}
            options={fontOptions}
            onOptionChange={handleFontSizeChange}
          />
        </div>
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

          <button
            disabled={isButtonDisable}
            className={styles.clearButton}
            onClick={onClearEditor}
          >
            Clear
          </button>
        </div>
      </div>
      <div className={`${styles.codeEditor} ${styles[selectedTheme]}`}>
        <div ref={lineNumberRef} className={styles.lineNumbers}>
          {code.split("\n").map((_, index) => (
            <div
              key={index}
              className={styles.lineNumber}
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: `${lineHeight}px`,
              }}
            >
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
          style={{ fontSize: `${fontSize}px`, lineHeight: `${lineHeight}px` }}
        />
      </div>
    </div>
  );
};

type CodeEditorProps = {
  initialCode?: string;
  onRunButtonClick: (code: string) => void;
  onClearButtonClick: () => void;
  onCancleButtonClick: () => void;
  isExecuting: boolean;
};

export default CodeEditor;
