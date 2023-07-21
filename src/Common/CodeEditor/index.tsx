import React, { useState, useRef, useEffect } from "react";

import styles from "./codeEditor.module.css";

const CodeEditor = () => {
  const [code, setCode] = useState<string>("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const syncScroll = () => {
    if (textAreaRef.current && lineNumberRef.current) {
      const lineNumberTop = textAreaRef.current.scrollTop;
      lineNumberRef.current.scrollTop = lineNumberTop;
    }
  };

  useEffect(() => {
    syncScroll();
  }, [code]);

  const handleScroll = () => {
    syncScroll();
  };

  return (
    <div className={`${styles.codeEditor} ${styles.lightTheme}`}>
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
  );
};

export default CodeEditor;
