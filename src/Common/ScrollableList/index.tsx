import React, { useState } from "react";

import TruncateText from "../TruncateText";

import styles from "./scrollableList.module.css";

const ScrollableList = (props: ScrollableListProps) => {
  const { title, items, onItemClick, maxVisibleChars = 40 } = props;

  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={styles.scrollableList}>
      <h2>{title}</h2>
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
  containerHeight?: string;
};

export default ScrollableList;
