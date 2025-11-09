'use client';
import React, { useState } from 'react';
import VideoScreens from './videoscreen';
import ChatScreen from './chatscreen';
import ControlButtons from './controllerbuttons';
import styles from './videochat_main.module.css';

interface Participant {
  id: string;
  name: string;
  isLocal?: boolean;
}

const VideoChat: React.FC = () => {
  const [isGroupMode, setIsGroupMode] = useState(false);
  const [showGroupLink, setShowGroupLink] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [mainVideoId, setMainVideoId] = useState('person1');
  const [minimizedVideos, setMinimizedVideos] = useState<string[]>([]);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [messages, setMessages] = useState<Array<{ sender: string; text: string }>>([]);
  const [messageInput, setMessageInput] = useState('');
  

  // Default two-person mode participants
  const [participants, setParticipants] = useState<Participant[]>([
    { id: 'person1', name: 'You', isLocal: true },
    { id: 'person2', name: 'Stranger' }
  ]);

  const groupLink = 'https://yourchat.com/room/abc123xyz';

  const handleGroupToggle = () => {
    if (isGroupMode) {
      // Switch back to two-person mode
      setIsGroupMode(false);
      setShowGroupLink(false);
      setParticipants([
        { id: 'person1', name: 'You', isLocal: true },
        { id: 'person2', name: 'Stranger' }
      ]);
      setMinimizedVideos([]);
    } else {
      // Enable group mode
      setIsGroupMode(true);
      setShowGroupLink(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(groupLink);
  };

  const handleSkip = () => {
    // Reset to two-person mode and find new stranger
    setIsGroupMode(false);
    setShowGroupLink(false);
    setParticipants([
      { id: 'person1', name: 'You', isLocal: true },
      { id: 'person2', name: 'Stranger' }
    ]);
    setMessages([]);
    setMinimizedVideos([]);
    setMainVideoId('person1');
  };

  const handleMinimizeVideo = (videoId: string) => {
    if (!minimizedVideos.includes(videoId)) {
      setMinimizedVideos([...minimizedVideos, videoId]);
    }
  };

  const handleMaximizeVideo = (videoId: string) => {
    setMinimizedVideos(minimizedVideos.filter(id => id !== videoId));
    setMainVideoId(videoId);
  };

  const handleThumbnailClick = (videoId: string) => {
    setMainVideoId(videoId);
  };

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      setMessages([...messages, { sender: 'You', text: messageInput }]);
      setMessageInput('');
    }
  };

    function handleNext(): void {
        throw new Error('Function not implemented.');
    }

  return (
    <div className={styles.container}>
      {/* Video Area with Controls */}
      <div className={styles.videoArea}>
        <VideoScreens
          participants={participants}
          mainVideoId={mainVideoId}
          minimizedVideos={minimizedVideos}
          onMinimizeVideo={handleMinimizeVideo}
          onMaximizeVideo={handleMaximizeVideo}
          onThumbnailClick={handleThumbnailClick}
        />

<ControlButtons
  isMicOn={isMicOn}
  isCameraOn={isCameraOn}
  onMicToggle={() => setIsMicOn(!isMicOn)}
  onCameraToggle={() => setIsCameraOn(!isCameraOn)}
  onNext={handleNext}
/>

      </div>

      {/* Chat Panel */}
      <ChatScreen
        isChatOpen={isChatOpen}
        messages={messages}
        messageInput={messageInput}
        onToggleChat={() => setIsChatOpen(!isChatOpen)}
        onMessageInputChange={setMessageInput}
        onSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default VideoChat;