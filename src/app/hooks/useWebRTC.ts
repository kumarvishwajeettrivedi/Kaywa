import { useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

const configuration: RTCConfiguration = {
    iceServers: [
        {
            urls: [
                'stun:turn.magistic.in:3478',
                'turn:turn.magistic.in:3478?transport=udp',
                'turn:turn.magistic.in:3478?transport=tcp'
            ],
            username: 'username',
            credential: 'password'
        }
    ]
};

export const useWebRTC = (
    socket: Socket | null,
    partnerId: string,
    isCreator: boolean,
    recieveMessage: (message: string) => void,
    addLog: (log: string) => void
) => {
    // Add these state variables at the top of the hook
    const [localStream, setLocalStream] = useState<MediaStream | null>(null);
    const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);

    const [connection, setConnection] = useState<RTCPeerConnection | null>(null);
    const [dataChannel, setDataChannel] = useState<RTCDataChannel | null>(null);

    // Add this useEffect to handle local media stream
    useEffect(() => {
        const getLocalMedia = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: true,
                    audio: true
                });
                setLocalStream(stream);
            } catch (error) {
                addLog(`Error accessing media devices: ${error}`);
            }
        };

        getLocalMedia();

        return () => {
            if (localStream) {
                localStream.getTracks().forEach(track => track.stop());
            }
        };
    }, []);



    useEffect(() => {
        if (!socket || !partnerId) return;

        const handleOffer = async (data: { sdp: string }) => {
            addLog('Received offer from partner');

            const pc = new RTCPeerConnection(configuration);
            setConnection(pc);

            // Add local stream tracks to connection (for answerer)
            if (localStream) {
                localStream.getTracks().forEach(track => {
                    pc.addTrack(track, localStream);
                });
            }

            // Setup remote stream handling
            pc.ontrack = (event) => {
                setRemoteStream(event.streams[0]);
            };

            pc.ondatachannel = (event) => setupDataChannel(event.channel);


            pc.onicecandidate = (event) => {
                if (event.candidate && socket.connected) {
                    addLog('Sending ICE candidate to partner');
                    socket.emit('iceCandidate', { candidate: event.candidate, to: partnerId });
                }
            };

            try {
                const offer = JSON.parse(data.sdp);
                await pc.setRemoteDescription(offer);
                const answer = await pc.createAnswer();
                await pc.setLocalDescription(answer);

                if (pc.localDescription && socket.connected) {
                    addLog('Sending answer to partner');
                    socket.emit('answer', { sdp: JSON.stringify(pc.localDescription), to: partnerId });
                }
            } catch (error) {
                addLog(`Error handling offer: ${error}`);
            }
        };

        const handleAnswer = async (data: { sdp: string }) => {
            addLog('Received answer from partner');
            if (connection) {
                try {
                    const answer = JSON.parse(data.sdp);
                    await connection.setRemoteDescription(answer);
                } catch (error) {
                    addLog(`Error setting remote description: ${error}`);
                }
            }
        };

        const handleIceCandidate = async (data: { candidate: RTCIceCandidateInit }) => {
            addLog('Received ICE candidate from partner');
            if (connection) {
                try {
                    await connection.addIceCandidate(data.candidate);
                } catch (error) {
                    addLog(`Error adding ICE candidate: ${error}`);
                }
            }
        };

        socket.on('offer', handleOffer);
        socket.on('answer', handleAnswer);
        socket.on('iceCandidate', handleIceCandidate);

        return () => {
            socket.off('offer', handleOffer);
            socket.off('answer', handleAnswer);
            socket.off('iceCandidate', handleIceCandidate);
        };
    }, [socket, partnerId, connection, addLog]);


    useEffect(() => {
        if (partnerId && socket && partnerId && isCreator) {
            createOffer();
        }
    }, [partnerId, socket]);

    const createOffer = async () => {
        if (!socket || !partnerId) return;

        const pc = new RTCPeerConnection(configuration);
        setConnection(pc);

        // Add local stream tracks to connection (for creator)
        if (localStream) {
            localStream.getTracks().forEach(track => {
                pc.addTrack(track, localStream);
            });
        }

        // Setup remote stream handling
        pc.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
        };

        const dc = pc.createDataChannel('chat');
        setupDataChannel(dc);

        pc.onicecandidate = (event) => {
            if (event.candidate && socket.connected) {
                addLog('Sending ICE candidate to partner');
                socket.emit('iceCandidate', { candidate: event.candidate, to: partnerId });
            }
        };

        try {
            const offer = await pc.createOffer();
            await pc.setLocalDescription(offer);

            if (pc.localDescription && socket.connected) {
                addLog('Sending offer to partner');
                socket.emit('offer', { sdp: JSON.stringify(pc.localDescription), to: partnerId });
            }
        } catch (error) {
            addLog(`Error creating offer: ${error}`);
        }
    };


    const setupDataChannel = (dc: RTCDataChannel) => {
        setDataChannel(dc);
        dc.onopen = () => addLog('Data channel opened');
        dc.onclose = () => addLog('Data channel closed');
        dc.onmessage = (event) => {
            // This is where you'll handle incoming messages
            // You'll need to pass a callback function from your component
            recieveMessage(event.data);
            addLog(`Received message: ${event.data}`);
            // You'll want to call a callback function here, e.g.:
            // onMessageReceived(event.data);
        };
    };

    return {
        connection,
        dataChannel,
        setupDataChannel,
        localStream,
        remoteStream
    };
};