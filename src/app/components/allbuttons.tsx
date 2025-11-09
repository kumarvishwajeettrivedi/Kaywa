import React from "react";
import styles from "../cssmodule/allbuttons.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

const Button: React.FC<ButtonProps> = ({ label, ...props }) => {
  return (
    <button className={`${styles.customButton} ${styles.large}`} {...props}>
      {label}
    </button>
  );
};

export default Button;
