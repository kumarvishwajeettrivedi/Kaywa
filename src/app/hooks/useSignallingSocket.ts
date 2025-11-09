import { useState, useEffect } from 'react';
import { io, Socket } from 'socket.io-client';

interface SignalingEvents {
  matched: (data: { partnerId: string }) => void;
  offer: (data: { sdp: string }) => void;
  answer: (data: { sdp: string }) => void;
  iceCandidate: (data: { candidate: RTCIceCandidateInit }) => void;
  partnerDisconnected: () => void;
  joinQueue: () => void;
}

export const useSignalingSocket = (addLog: (log: string) => void) => {
  const [socket, setSocket] = useState<Socket<SignalingEvents> | null>(null);
  const [isCreator, setIsCreator] = useState<boolean>(false);
  const [status, setStatus] = useState<'disconnected' | 'waiting' | 'connected'>('disconnected');
  const [partnerId, setPartnerId] = useState<string>('');

  useEffect(() => {
    const newSocket = io('https://sig.magistic.in', {
      // path: '/api/socket',
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      addLog('Connected to signaling server');
      setSocket(newSocket);
    });

    newSocket.on('disconnect', () => {
      addLog('Disconnected from signaling server');
      setStatus('disconnected');
    });

    newSocket.on('matched', (data) => {
      addLog(`Matched with partner: ${data.partnerId}`);
      setPartnerId(data.partnerId);
      setIsCreator(data.creator);
      setStatus('connected');
    });

    newSocket.on('partnerDisconnected', () => {
      addLog('Partner disconnected');
      setStatus('disconnected');
      setPartnerId('');
    });

    return () => {
      newSocket.close();
    };
  }, [addLog]);

  const joinQueue = () => {
    if (socket) {
      addLog('Joining matching queue...');
      socket.emit('joinQueue');
      setStatus('waiting');
    }
  };

  const disconnect = () => {
    if (socket) {
      socket.close();
    }
    setStatus('disconnected');
    setPartnerId('');
    addLog('Disconnected');
  };

  return {
    socket,
    status,
    partnerId,
    isCreator,
    joinQueue,
    disconnect
  };
};