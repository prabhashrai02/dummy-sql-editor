import React from "react";

import styles from "./card.module.css";

const Card = ({ children }: CardProps) => {
  return <div className={styles.card}>{children}</div>;
};

type CardProps = {
  children: React.ReactNode;
};

export default Card;
