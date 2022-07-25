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
  const [me, setMe] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  // useEffect(() => {
  //   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  //     .then((currentStream) => {
  //       setStream(currentStream);

  //       myVideo.current.srcObject = currentStream;
  //     });

  //   socket.on('callUser', ({ from, name: callerName, signal }) => {
  //     setCall({ isReceivingCall: true, from, name: callerName, signal });
  //   });
  // }, []);

  const answerCall = () => {
    setCallAccepted(true);

    const peer = new Peer({ initiator: false, trickle: false, stream });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: call.from });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    peer.signal(call.signal);

    connectionRef.current = peer;
  };

  const callUser = (receiverId, senderId) => {
    const peer = new Peer({ initiator: true, trickle: false, stream });

    console.log('receiverId', receiverId);
    console.log('senderId', senderId);
    console.log('stream', stream);
    peer.on('signal', (data) => {
      socket.emit('callUser', { userToCall: receiverId, signalData: data, from: senderId, name });
    });

    peer.on('stream', (currentStream) => {
      userVideo.current.srcObject = currentStream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);

      peer.signal(signal);
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
      myVideo,
      userVideo,
      stream,
      setStream,
      name,
      setName,
      callEnded,
      me,
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

// export const SocketContext = React.createContext({
//   socket: firstSocket,

//   setSocket: () => { },
//   call: {},
//   callAccepted: false,
//   myVideo: null,
//   userVideo: null,
//   stream: null,
//   name: "",
//   setName: () => { },
//   callEnded: false,
//   callUser: () => { },
//   leaveCall: () => { },
//   answerCall: () => { },

// });