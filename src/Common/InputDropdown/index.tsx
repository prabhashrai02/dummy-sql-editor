import React from "react";

import styles from "./inputDropdown.module.css";

const InputDropdown = (props: ThemeSelectProps) => {
  const { label, selectedOption, options, onOptionChange, labelPosition = "top" } = props;

  const labelStyle = labelPosition === "left" ? styles.labelLeft : styles.labelTop;

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onOptionChange(event.target.value);
  };

  return (
    <div
      className={`${styles.selectContainer} ${labelStyle}`}
    >
      <label className={styles.selectLabel}>{label}</label>
      <select
        className={styles.selectWrapper}
        value={selectedOption}
        onChange={handleOptionChange}
      >
        {options.map((theme) => (
          <option key={theme.key} value={theme.value}>
            {theme.key}
          </option>
        ))}
      </select>
    </div>
  );
};

type ThemeOption = {
  key: string;
  value: string;
};

type ThemeSelectProps = {
  label: string;
  selectedOption: string;
  options: ThemeOption[];
  onOptionChange: (theme: string) => void;
  labelPosition?: "top" | "left";
};

export default InputDropdown;
