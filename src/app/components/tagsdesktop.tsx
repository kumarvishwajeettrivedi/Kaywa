'use client';
import React, { useState } from 'react';
import styles from '../cssmodule/tagsdesktop.module.css';
import { categories, CategoryData } from './tags';

interface TagsScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

const TagsScreen: React.FC<TagsScreenProps> = ({ isOpen, onClose }) => {
  const [selectedTags, setSelectedTags] = useState<Record<string, boolean>>({});

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleTagClick = (tag: string) => {
    console.log(`Tag selected: ${tag}`);
    // Toggle selection
    setSelectedTags(prev => ({
      ...prev,
      [tag]: !prev[tag]
    }));
    // Add your tag selection logic here
  };

  // Calculate selected tags count per category
  const getCategorySelectedCount = (categoryItems: string[]) => {
    return categoryItems.filter(item => selectedTags[item]).length;
  };

  // Get total items in category
  const getCategoryTotalCount = (categoryItems: string[]) => {
    return categoryItems.length;
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div 
        className={styles.card} 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div 
          className={styles.closeButton}
          onClick={onClose}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && onClose()}
          aria-label="Close tags"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>

        {/* Tags Header */}
        <div className={styles.tagsHeader}>
          <div className={styles.tagsTitle}>All Tags</div>
          <div className={styles.tagsSubtitle}>Browse by categories</div>
        </div>

        {/* Tags Content */}
        <div className={styles.tagsContent}>
          {categories.map((category: CategoryData, index: number) => {
            const selectedCount = getCategorySelectedCount(category.items);
            const totalCount = getCategoryTotalCount(category.items);
            
            return (
              <div key={index} className={styles.categorySection}>
                <div className={styles.categoryTitle}>
                  {category.title}
                  {selectedCount > 0 && (
                    <span className={styles.categoryCount}>
                      ({selectedCount}/{totalCount})
                    </span>
                  )}
                </div>
                <div className={styles.tagsGrid}>
                  {category.items.map((tag: string, tagIndex: number) => (
                    <div
                      key={tagIndex}
                      className={`${styles.tagChip} ${selectedTags[tag] ? styles.tagChipSelected : ''}`}
                      onClick={() => handleTagClick(tag)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleTagClick(tag)}
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TagsScreen;