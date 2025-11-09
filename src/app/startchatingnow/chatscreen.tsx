'use client';
import React, { useEffect, useRef } from 'react';
import styles from './chatscreen.module.css';

interface Message {
  sender: string;
  text: string;
}

interface ChatScreenProps {
  isChatOpen: boolean;
  messages: Message[];
  messageInput: string;
  onToggleChat: () => void;
  onMessageInputChange: (value: string) => void;
  onSendMessage: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({
  isChatOpen,
  messages,
  messageInput,
  onToggleChat,
  onMessageInputChange,
  onSendMessage
}) => {
  const chatPanelRef = useRef<HTMLDivElement>(null);
  const mobileToggleRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  // Close bottom sheet when clicking outside or on backdrop
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Close if clicking on backdrop
      if (backdropRef.current && backdropRef.current.contains(target)) {
        onToggleChat();
        return;
      }

      // Close if clicking outside both chat panel and mobile toggle
      if (isChatOpen && 
          chatPanelRef.current && 
          !chatPanelRef.current.contains(target) &&
          mobileToggleRef.current &&
          !mobileToggleRef.current.contains(target)) {
        onToggleChat();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isChatOpen, onToggleChat]);

  return (
    <>
      {/* Mobile Floating Button */}
      <div 
        ref={mobileToggleRef}
        className={styles.mobileChatToggle}
        onClick={onToggleChat}
      >
        <div className={styles.mobileToggleIcon}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        </div>
      </div>

      {/* Backdrop for mobile */}
      {isChatOpen && (
        <div 
          ref={backdropRef}
          className={styles.bottomSheetBackdrop}
        />
      )}

      {/* Chat Panel with Bottom Sheet Behavior */}
      <div 
        ref={chatPanelRef}
        className={`${styles.chatPanel} ${!isChatOpen ? styles.chatPanelClosed : ''} ${styles.chatBottomSheet}`}
      >
        {/* Desktop Trapezoid Toggle Button */}
        <div className={styles.chatToggleTrapezoid} onClick={onToggleChat}>
          <div className={styles.trapezoidShape}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isChatOpen ? (
                <polyline points="6 15 12 9 18 15"></polyline>    
              ) : (
                <polyline points="6 9 12 15 18 9"></polyline> 
              )}
            </svg>
          </div>
        </div>

        {/* Mobile Bottom Sheet Header with Cross Close */}
        <div className={styles.bottomSheetHeader}>
          <div className={styles.bottomSheetHandle}></div>
          <div className={styles.bottomSheetTitle}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            <span>Chat</span>
          </div>
          {/* Cross Close Button for Mobile */}
          <div className={styles.bottomSheetClose} onClick={onToggleChat}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
        </div>

        {isChatOpen && (
          <>
            {/* Desktop Header */}
            <div className={styles.chatHeader}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              <span>Chat</span>
            </div>

            <div className={styles.chatMessages}>
              {messages.map((msg, index) => (
                <div key={index} className={styles.chatMessage}>
                  <div className={styles.messageSender}>{msg.sender}</div>
                  <div className={styles.messageText}>{msg.text}</div>
                </div>
              ))}
            </div>

            <div className={styles.chatInput}>
              <input
                type="text"
                placeholder="Type a message..."
                value={messageInput}
                onChange={(e) => onMessageInputChange(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <div className={styles.sendButton} onClick={onSendMessage}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13"></line>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatScreen;