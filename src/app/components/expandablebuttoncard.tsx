"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "../cssmodule/expandablebuttoncard.module.css";

interface ExpandableButtonProps {
  title: string;
  items: string[];
}

const ExpandableButton: React.FC<ExpandableButtonProps> = ({ title, items }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item)
        ? prev.filter((i) => i !== item)
        : [...prev, item]
    );
  };

  // 🔹 Detect click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup on unmount or when collapsed
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div
      ref={buttonRef}
      className={`${styles.customButton} ${isExpanded ? styles.expanded : ""}`}
      style={{
        position: "relative",
        zIndex: isExpanded ? 1000 : 1,
        overflow: "visible",
      }}
    >
      <div className={styles.buttonHeader} onClick={toggleExpand}>
        <div className={styles.headerContent}>
          <span className={styles.text}>{title}</span>
          {selectedItems.length > 0 && (
            <span className={styles.selectionBadge}>
              {selectedItems.length}
            </span>
          )}
        </div>
        <span className={styles.plus}>{isExpanded ? "−" : "+"}</span>
      </div>

      {isExpanded && (
        <div
          className={styles.dropdown}
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 1001,
          }}
        >
          {items.map((item) => (
            <div
              key={item}
              className={`${styles.dropdownItem} ${
                selectedItems.includes(item) ? styles.selected : ""
              }`}
              onClick={() => toggleItem(item)}
            >
              <span className={styles.checkbox}>
                {selectedItems.includes(item) && "✓"}
              </span>
              <span className={styles.itemText}>{item}</span>
            </div>
          ))}

          <div className={styles.dropdownProgress}>
            <div className={styles.progressText}>
              {selectedItems.length} of {items.length} selected
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableButton;
