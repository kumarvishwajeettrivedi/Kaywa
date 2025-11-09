'use client';
import { useState, useEffect } from 'react';
import { X, Coins, Plus, Gift, Zap, Clock, Calendar } from 'lucide-react';
import styles from '../cssmodule/credit.module.css';

interface CreditScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreditScreen({ isOpen, onClose }: CreditScreenProps) {
  const [credits, setCredits] = useState(150);
  const [isPurchasing, setIsPurchasing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handlePurchase = (packageCredits: number, price: number, duration: string) => {
    setIsPurchasing(true);
    setTimeout(() => {
      setCredits(prev => prev + packageCredits);
      setIsPurchasing(false);
      console.log(`Purchased ${packageCredits} credits for ₹${price} (${duration})`);
    }, 1500);
  };

  const creditPackages = [
    { 
      credits: 50, 
      price: 20, 
      duration: "1 Hour", 
      popular: false,
      icon: <Clock size={14} />,
      description: "Quick access"
    },
    { 
      credits: 200, 
      price: 30, 
      duration: "1 Day", 
      popular: true,
      icon: <Calendar size={14} />,
      description: "Full day access"
    },
    { 
      credits: 500, 
      price: 80, 
      duration: "3 Days", 
      popular: false,
      icon: <Calendar size={14} />,
      description: "Extended access"
    },
    { 
      credits: 1000, 
      price: 150, 
      duration: "7 Days", 
      popular: false,
      icon: <Calendar size={14} />,
      description: "Weekly premium"
    },
  ];

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className={styles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>

        {/* Header */}
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <Coins size={24} className={styles.coinIcon} />
          </div>
          <h1 className={styles.title}>Credits</h1>
          <div className={styles.creditBalance}>
            <span className={styles.creditAmount}>{credits}</span>
            <span className={styles.creditLabel}>Available</span>
          </div>
          <p className={styles.subtitle}>
            Choose your plan to unlock premium AI conversations
          </p>
        </div>

        {/* Credit Packages */}
        <div className={styles.packagesSection}>
          <div className={styles.sectionHeader}>
            <Zap size={16} color="#173732" />
            <h2 className={styles.sectionTitle}>Purchase Plan</h2>
          </div>
          
          <div className={styles.packagesGrid}>
            {creditPackages.map((pkg, index) => (
              <div
                key={index}
                className={`${styles.packageCard} ${
                  pkg.popular ? styles.popular : ''
                }`}
                onClick={() => handlePurchase(pkg.credits, pkg.price, pkg.duration)}
              >
                {pkg.popular && (
                  <div className={styles.popularBadge}>
                    <Gift size={10} />
                    Popular
                  </div>
                )}
                <div className={styles.packageContent}>
                  <div className={styles.packageCredits}>
                    <Coins size={16} className={styles.packageCoin} />
                    {pkg.credits}
                  </div>
                  <div className={styles.packagePrice}>
                    <span className={styles.rupeeSymbol}>₹</span>
                    {pkg.price}
                  </div>
                  <div className={styles.packageDuration}>
                    {pkg.icon}
                    {pkg.duration}
                  </div>
                  <div className={styles.packageValue}>
                    {pkg.description}
                  </div>
                </div>
                <div className={styles.addButton}>
                  <Plus size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className={styles.featuresSection}>
          <div className={styles.sectionHeader}>
            <Zap size={16} color="#173732" />
            <h2 className={styles.sectionTitle}>Features</h2>
          </div>
          <div className={styles.featuresGrid}>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>💬</div>
              <div className={styles.featureText}>AI Chats</div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🎙️</div>
              <div className={styles.featureText}>Voice</div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>🚀</div>
              <div className={styles.featureText}>Priority</div>
            </div>
            <div className={styles.featureItem}>
              <div className={styles.featureIcon}>⭐</div>
              <div className={styles.featureText}>Support</div>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isPurchasing && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}></div>
            <p>Processing...</p>
          </div>
        )}
      </div>
    </div>
  );
}