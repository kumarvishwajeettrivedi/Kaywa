'use client';
import React, { useState } from 'react';
import styles from './videoscreen.module.css';

interface Participant {
  id: string;
  name: string;
  isLocal?: boolean;
}

interface VideoScreensProps {
  participants: Participant[];
  mainVideoId: string;
  minimizedVideos: string[];
  onMinimizeVideo: (videoId: string) => void;
  onMaximizeVideo: (videoId: string) => void;
  onThumbnailClick: (videoId: string) => void;
}

const VideoScreens: React.FC<VideoScreensProps> = ({
  participants,
  mainVideoId,
  minimizedVideos,
  onMinimizeVideo,
  onMaximizeVideo,
  onThumbnailClick
}) => {
  const [isStrangerFullScreen, setIsStrangerFullScreen] = useState(false);

  const getLocalParticipant = () => {
    return participants.find(p => p.isLocal);
  };

  const getRemoteParticipants = () => {
    return participants.filter(p => !p.isLocal);
  };

  const localParticipant = getLocalParticipant();
  const remoteParticipants = getRemoteParticipants();
  const mainRemoteParticipant = remoteParticipants[0];

  const handleFullScreenToggle = () => {
    setIsStrangerFullScreen(!isStrangerFullScreen);
  };

  const getDesktopLayoutClass = () => {
    return isStrangerFullScreen ? styles.fullScreenStranger : '';
  };

  const getMobileLayoutClass = () => {
    return isStrangerFullScreen ? styles.fullScreenStranger : '';
  };

  const getLocalVideoClass = () => {
    return isStrangerFullScreen ? styles.collapsed : '';
  };

  return (
    <div className={styles.videoArea}>
      {/* Desktop Layout */}
      <div className={`${styles.desktopLayout} ${getDesktopLayoutClass()}`}>
        {/* Stranger Video - Left */}
        <div className={styles.videoPanel}>
          {mainRemoteParticipant && (
            <div className={`${styles.videoContainer} ${styles.strangerVideo}`}>
              <div className={styles.videoWrapper}>
                <div className={styles.videoContent}>
                  <div className={styles.videoPlaceholder}>
                    <div className={styles.avatar}>
                      {mainRemoteParticipant.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.participantName}>
                      {mainRemoteParticipant.name}
                    </div>
                    <div className={styles.status}>Connected</div>
                  </div>
                </div>
                <div className={styles.videoControls}>
                  <div 
                    className={styles.controlButton}
                    onClick={handleFullScreenToggle}
                    title={isStrangerFullScreen ? 'Collapse stranger screen' : 'Expand stranger screen'}
                  >
                    {isStrangerFullScreen ? <CollapseIcon /> : <ExpandIcon />}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Local Video - Right */}
        <div className={styles.videoPanel}>
          {localParticipant && (
            <div className={`${styles.videoContainer} ${styles.localVideo} ${getLocalVideoClass()}`}>
              <div className={styles.videoWrapper}>
                <div className={styles.videoContent}>
                  <div className={styles.videoPlaceholder}>
                    <div className={styles.avatar}>
                      {localParticipant.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.status}>Live</div>
                  </div>
                </div>
                <div className={styles.youBadge}>
                  You
                </div>
                <div className={styles.videoControls}>
                  <div className={styles.connectionStatus}>
                    <div className={styles.connectionDot}></div>
                    Stable
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Layout */}
      <div className={`${styles.mobileLayout} ${getMobileLayoutClass()}`}>
        {/* Stranger - Top */}
        <div className={styles.mobileTop}>
          {mainRemoteParticipant && (
            <div className={`${styles.videoContainer} ${styles.strangerVideo}`}>
              <div className={styles.videoWrapper}>
                <div className={styles.videoContent}>
                  <div className={styles.videoPlaceholder}>
                    <div className={styles.avatar}>
                      {mainRemoteParticipant.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.participantName}>
                      {mainRemoteParticipant.name}
                    </div>
                    <div className={styles.status}>Connected</div>
                  </div>
                </div>
                <div className={styles.videoControls}>
                  <div 
                    className={styles.controlButton}
                    onClick={handleFullScreenToggle}
                    title={isStrangerFullScreen ? 'Collapse stranger screen' : 'Expand stranger screen'}
                  >
                    {isStrangerFullScreen ? <CollapseIcon /> : <ExpandIcon />}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Local - Bottom */}
        <div className={styles.mobileBottom}>
          {localParticipant && (
            <div className={`${styles.videoContainer} ${styles.localVideo} ${getLocalVideoClass()}`}>
              <div className={styles.videoWrapper}>
                <div className={styles.videoContent}>
                  <div className={styles.videoPlaceholder}>
                    <div className={styles.avatar}>
                      {localParticipant.name.charAt(0).toUpperCase()}
                    </div>
                    <div className={styles.status}>Live</div>
                  </div>
                </div>
                <div className={styles.youBadge}>
                  You
                </div>
                <div className={styles.videoControls}>
                  <div className={styles.connectionStatus}>
                    <div className={styles.connectionDot}></div>
                    Stable
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Participants Grid */}
      {remoteParticipants.length > 1 && (
        <div className={styles.participantsGrid}>
          <div className={styles.gridHeader}>
            <span>Other Participants ({remoteParticipants.length - 1})</span>
          </div>
          <div className={styles.grid}>
            {remoteParticipants.slice(1).map((participant) => (
              <div 
                key={participant.id}
                className={styles.gridParticipant}
                onClick={() => onThumbnailClick(participant.id)}
              >
                <div className={styles.gridVideo}>
                  <div className={styles.avatar}>
                    {participant.name.charAt(0).toUpperCase()}
                  </div>
                  <div className={styles.gridName}>
                    {participant.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// SVG Icons as separate components
const ExpandIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>
  </svg>
);

const CollapseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"/>
  </svg>
);

export default VideoScreens;