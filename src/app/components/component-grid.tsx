"use client"
import React from 'react';
import styles from '../cssmodule/component-grid.module.css';
import ExpandableButton from "./expandablebuttoncard";
import { categories } from './tags';

// Props for the grid component
interface CategoryData {
  title: string;
  items: string[];
}

interface CategoryGridProps {
  categories: CategoryData[];
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ categories }) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.grid}>
        {categories.map((category) => (
          <div key={category.title} className={styles.gridItem}>
            <ExpandableButton 
              title={category.title} 
              items={category.items} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

// Main component with the data
const MainComponent: React.FC = () => {
  
  return <CategoryGrid categories={categories} />;
};

export default MainComponent;