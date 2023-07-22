import React, { useState, useRef, useEffect } from "react";

import InputDropdown from "../InputDropdown";

import styles from "./codeEditor.module.css";

const CodeEditor = () => {
  const [code, setCode] = useState<string>("");
  const [selectedTheme, setSelectedTheme] = useState<string>("lightTheme");
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

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
  };

  return (
    <div>
      <div className={styles.toolbar}>
        <InputDropdown
          label={""}
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

const themeOptions = [
  { key: "Light Theme", value: "lightTheme" },
  { key: "Dark Theme", value: "darkTheme" },
  { key: "Night Owl Theme", value: "nightOwlTheme" },
  { key: "Solarized Light Theme", value: "solarizedLightTheme" },
  { key: "Dracula Theme", value: "draculaTheme" },
  { key: "Oceanic Next Theme", value: "oceanicNextTheme" },
  { key: "GitHub Theme", value: "gitHubTheme" },
];

export default CodeEditor;
