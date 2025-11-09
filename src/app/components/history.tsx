'use client';
import React from 'react';
import styles from '../cssmodule/history.module.css';

interface HistoryScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Person {
  id: number;
  name: string;
  country: string;
  gender: string;
  image?: string;
  lastChat: string;
  date: string; // DD/MM/YYYY format
}

const HistoryScreen: React.FC<HistoryScreenProps> = ({ isOpen, onClose }) => {
  // Sample history data with dates
  const historyData: Person[] = [
    {
      id: 1,
      name: "Sarah Johnson",
      country: "United States",
      gender: "Female",
      image: "/kaywalog.png",
      lastChat: "2 hours ago",
      date: "15/12/2024"
    },
    {
      id: 2,
      name: "Alex Chen",
      country: "Canada",
      gender: "Male", 
      image: "/kaywalog.png",
      lastChat: "1 day ago",
      date: "15/12/2024"
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      country: "Spain",
      gender: "Female",
      image: "/kaywalog.png",
      lastChat: "3 days ago",
      date: "14/12/2024"
    },
    {
      id: 4,
      name: "David Kim",
      country: "South Korea",
      gender: "Male",
      image: "/kaywalog.png",
      lastChat: "1 week ago",
      date: "10/12/2024"
    },
    {
      id: 5,
      name: "Emma Wilson",
      country: "United Kingdom",
      gender: "Female",
      image: "/kaywalog.png",
      lastChat: "2 weeks ago",
      date: "05/12/2024"
    },
    {
      id: 6,
      name: "James Brown",
      country: "Australia",
      gender: "Male",
      image: "/kaywalog.png",
      lastChat: "3 weeks ago",
      date: "25/11/2024"
    }
  ];

  // Group by date
  const groupedByDate = historyData.reduce((acc, person) => {
    if (!acc[person.date]) {
      acc[person.date] = [];
    }
    acc[person.date].push(person);
    return acc;
  }, {} as Record<string, Person[]>);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleChatAgain = (personId: number) => {
    console.log(`Start chat with person ${personId}`);
    // Add your chat logic here
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
          aria-label="Close history"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </div>

        {/* History Header */}
        <div className={styles.historyHeader}>
          <div className={styles.historyTitle}>Chat History</div>
          <div className={styles.historySubtitle}>Your recent conversations</div>
        </div>

        {/* History Content */}
        <div className={styles.historyContent}>
          {Object.entries(groupedByDate).map(([date, persons]) => (
            <div key={date} className={styles.dateSection}>
              <div className={styles.dateHeader}>{date}</div>
              <div className={styles.historyList}>
                {persons.map((person) => (
                  <div key={person.id} className={styles.historyItem}>
                    <div className={styles.userAvatar}>
                      {person.image ? (
                        <img 
                          src={person.image} 
                          alt={person.name}
                          className={styles.avatarImage}
                        />
                      ) : (
                        <div className={styles.avatarFallback}>
                          {person.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      )}
                    </div>
                    <div className={styles.userInfo}>
                      <div className={styles.userName}>{person.name}</div>
                      <div className={styles.userDetails}>
                        {person.country} • {person.gender}
                      </div>
                      <div className={styles.lastChat}>{person.lastChat}</div>
                    </div>
                    <div className={styles.chatAction}>
                      <div 
                        className={styles.chatAgainButton}
                        onClick={() => handleChatAgain(person.id)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && handleChatAgain(person.id)}
                      >
                        Chat Again
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryScreen;