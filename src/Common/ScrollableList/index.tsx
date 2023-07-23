import React, { useEffect, useState } from "react";
import TruncateText from "../TruncateText";

import styles from "./scrollableList.module.css";

const ScrollableList = (props: ScrollableListProps) => {
  const {
    title,
    items,
    maxVisibleChars = 40,
    onItemClick,
    onClearClick,
  } = props;

  const [searchQuery, setSearchQuery] = useState("");
  const [isClearDisable, setIsClearDisable] = useState(false);

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setIsClearDisable(filteredItems.length === 0);
  }, [filteredItems]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={styles.scrollableList}>
      <div className={styles.headingButtonContainer}>
        <h2>{title}</h2>
        {onClearClick && (
          <button
            disabled={isClearDisable}
            className={styles.clearButton}
            onClick={onClearClick}
          >
            Clear
          </button>
        )}
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearchChange}
      />
      <div className={styles.listContainer}>
        <ul>
          {filteredItems.map((item, index) => (
            <li key={index} onClick={() => onItemClick(item)}>
              <TruncateText text={item} length={maxVisibleChars} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

type ScrollableListProps = {
  title: string;
  items: string[];
  onItemClick: (item: string) => void;
  maxVisibleChars?: number;
  onClearClick?: () => void;
};

export default ScrollableList;
