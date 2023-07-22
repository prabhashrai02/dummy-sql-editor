import InputDropdown from "../InputDropdown";
import useCodeEditor from "./useCodeEditor";

import styles from "./codeEditor.module.css";

const CodeEditor = ({ initialCode }: CodeEditorProps) => {

  const {
    code,
    themeOptions,
    selectedTheme,
    textAreaRef,
    lineNumberRef,
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
};

export default CodeEditor;
