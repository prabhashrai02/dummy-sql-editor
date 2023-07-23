import { useState, useRef, useEffect } from "react";

import { CODE_EDITOR_THEME_KEY } from "../../Constants/localStorageKeys";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../Utils/storageUtils";

const useCodeEditor = (
  initialCode: string = "",
  initialTheme: string = "darkTheme"
) => {
  const initialCodeEditorTheme = getLocalStorageData<string>(CODE_EDITOR_THEME_KEY) || initialTheme;

  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true);
  const [code, setCode] = useState<string>(initialCode);
  const [selectedTheme, setSelectedTheme] = useState<string>(
    initialCodeEditorTheme
  );
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);

  const themeOptions = [
    { key: "Light Theme", value: "lightTheme" },
    { key: "Dark Theme", value: "darkTheme" },
    { key: "Night Owl Theme", value: "nightOwlTheme" },
    { key: "Solarized Light Theme", value: "solarizedLightTheme" },
    { key: "Dracula Theme", value: "draculaTheme" },
    { key: "Oceanic Next Theme", value: "oceanicNextTheme" },
    { key: "GitHub Theme", value: "gitHubTheme" },
  ];

  useEffect(() => {
    setIsButtonDisable(code.trim() === "");
  }, [code])

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const onClearEditor = () => {
    setCode("");
  };

  const syncScroll = () => {
    if (textAreaRef.current && lineNumberRef.current) {
      const lineNumberTop = textAreaRef.current.scrollTop;
      lineNumberRef.current.scrollTop = lineNumberTop;
    }
  };

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    syncScroll();
  }, [code]);

  const handleScroll = () => {
    syncScroll();
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    setLocalStorageData(CODE_EDITOR_THEME_KEY, theme);
  };

  return {
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
  };
};

export default useCodeEditor;
