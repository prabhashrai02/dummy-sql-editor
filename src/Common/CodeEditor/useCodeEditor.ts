import { useState, useRef, useEffect } from "react";

import { CODE_EDITOR_FONT_SIZE_KEY, CODE_EDITOR_THEME_KEY } from "../../Constants/localStorageKeys";
import {
  getLocalStorageData,
  setLocalStorageData,
} from "../../Utils/storageUtils";

const useCodeEditor = ( initialCode: string = "", initialTheme: string = "darkTheme", onClearButtonClick: () => void) => {
  const initialCodeEditorTheme = getLocalStorageData<string>(CODE_EDITOR_THEME_KEY) || initialTheme;
  const initialCodeFontSizeTheme = getLocalStorageData<string>(CODE_EDITOR_FONT_SIZE_KEY) || "16";

  const [isButtonDisable, setIsButtonDisable] = useState<boolean>(true);
  const [code, setCode] = useState<string>(initialCode);
  const [selectedTheme, setSelectedTheme] = useState<string>( initialCodeEditorTheme );
  const [fontSize, setFontSize] = useState<number>(Number(initialCodeFontSizeTheme));

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumberRef = useRef<HTMLDivElement>(null);

  const lineHeight = fontSize * 1.5;

  const themeOptions = [
    { key: "Light Theme", value: "lightTheme" },
    { key: "Dark Theme", value: "darkTheme" },
    { key: "Night Owl Theme", value: "nightOwlTheme" },
    { key: "Solarized Light Theme", value: "solarizedLightTheme" },
    { key: "Dracula Theme", value: "draculaTheme" },
    { key: "Oceanic Next Theme", value: "oceanicNextTheme" },
    { key: "GitHub Theme", value: "gitHubTheme" },
  ];

  const fontOptions = [
    { key: "12", value: "12" },
    { key: "16", value: "16" },
    { key: "18", value: "18" },
    { key: "20", value: "20" },
    { key: "22", value: "22" }
  ];

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    syncScroll();
  }, [code]);
  
  useEffect(() => {
    setIsButtonDisable(code.trim() === "");
  }, [code])

  const handleFontSizeChange = (size: string) => {
    setFontSize(Number(size));
    setLocalStorageData(CODE_EDITOR_FONT_SIZE_KEY, size);
  };

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value);
  };

  const onClearEditor = () => {
    setCode("");
    onClearButtonClick();
  };

  const syncScroll = () => {
    if (textAreaRef.current && lineNumberRef.current) {
      const lineNumberTop = textAreaRef.current.scrollTop;
      lineNumberRef.current.scrollTop = lineNumberTop;
    }
  };

  const handleScroll = () => {
    syncScroll();
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    setLocalStorageData(CODE_EDITOR_THEME_KEY, theme);
  };

  return {
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
  };
};

export default useCodeEditor;
