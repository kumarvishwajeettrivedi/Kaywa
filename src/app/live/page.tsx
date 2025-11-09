'use client';

import React, { useState, useCallback } from 'react';
import { Socket } from 'socket.io-client';
import { useSignalingSocket } from '../hooks/useSignallingSocket';
import { useWebRTC } from '../hooks/useWebRTC';
import ConnectionStatus from '../components/connectionStatus';
import QueueButton from '../components/queueButton';
import ChatInterface from '../components/chatInterface';
import LogDisplay from '../components/logDisplay';




export default function WebRTCSignaling() {
  const [logs, setLogs] = useState<string[]>([]);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<string[]>([]);

  const addLog = useCallback((log: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${log}`]);
  }, []);

  const {
    socket,
    status,
    partnerId, isCreator,
    joinQueue,
    disconnect
  } = useSignalingSocket(addLog);
  const recieveMessage = (message: string) => {
    setMessages(prev => [...prev, `Them: ${message}`]);
  }

  const {
    connection,
    dataChannel,
    setupDataChannel, localStream,
    remoteStream
  } = useWebRTC(socket, partnerId, isCreator, recieveMessage, addLog);


  const sendMessage = () => {
    if (dataChannel?.readyState === 'open' && message.trim()) {
      console.log("sending message", message.trim())
      dataChannel.send(message);
      setMessages(prev => [...prev, `You: ${message}`]);
      setMessage('');
    }
    else {

      console.log("failed to send message", message.trim())
    }
  };

  return (
    <div className="container">
      <h1>WebRTC Signaling with Matching Queue</h1>

      <ConnectionStatus status={status} partnerId={partnerId} />

      {status === 'disconnected' && (
        <QueueButton onJoinQueue={joinQueue} />
      )}<video
        ref={video => {
          if (video && localStream) video.srcObject = localStream;
        }}
        autoPlay
        muted
        playsInline
      />

      <video
        ref={video => {
          if (video && remoteStream) video.srcObject = remoteStream;
        }}
        autoPlay
        playsInline
      />

      {status === 'connected' && (
        <ChatInterface
          message={message}
          messages={messages}
          onMessageChange={setMessage}
          onSendMessage={sendMessage}
          onDisconnect={disconnect}
        />
      )}

      <LogDisplay logs={logs} />
    </div>
  );
}