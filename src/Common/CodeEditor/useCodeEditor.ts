import { useState, useRef, useEffect } from "react";

const useCodeEditor = (initialCode: string = "", initialTheme: string = "darkTheme") => {
  const [code, setCode] = useState<string>(initialCode);
  const [selectedTheme, setSelectedTheme] = useState<string>(initialTheme);
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

  return {
    code,
    themeOptions,
    selectedTheme,
    textAreaRef,
    lineNumberRef,
    handleCodeChange,
    handleScroll,
    handleThemeChange,
  };
};

export default useCodeEditor;
