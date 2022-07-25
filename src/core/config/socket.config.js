import React, { useState, useRef, useEffect, createContext } from "react";
import Cookies from 'js-cookie';
import { io } from "socket.io-client";
import Peer from 'simple-peer';


const token = Cookies.get('token') || null

const firstSocket = io.connect('localhost:4001', {
  query: {
    token: token
  }
});

export const connectSocket = (token) => {
  return io.connect('localhost:4001', {
    query: {
      token: token
    }
  });
}

const SocketContext = createContext();

const ContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(firstSocket);


  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [stream, setStream] = useState();
  const [name, setName] = useState('');
  const [call, setCall] = useState({});

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((currentStream) => {
        setStream(currentStream);

      });

    socket.on('callUser', ({ from, name: callerName, signal, meetingId }) => {
      console.log("call user");
      setCall({ isReceivingCall: true, from, name: callerName, signal, meetingId });
    });
  }, []);

  const answerCall = (fromName) => {
    console.log('answerCall');
    setCallAccepted(true);
    setName(fromName)
    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from, fromName });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (receiverId, senderId, meetingId) => {
    console.log('callUser');

    const peer = new Peer({ initiator: true, trickle: false, stream });

    console.log('receiverId', receiverId);
    console.log('senderId', senderId);
    console.log('stream', stream);
    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: receiverId, signalData: data, from: senderId, name, meetingId });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (data) => {
      console.log('callAccepted');
      setCall({ name: data.fromName })
      setCallAccepted(true);

      peer.signal(data.signal);
    });

    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);

    connectionRef.current.destroy();

    window.location.reload();
  };

  return (
    <SocketContext.Provider value={{
      socket: firstSocket,
      setSocket,
      call,
      setCall,
      callAccepted,
      setCallAccepted,
      myVideo,
      userVideo,
      stream,
      setStream,
      name,
      setName,
      callEnded,
      callUser,
      leaveCall,
      answerCall,
    }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
