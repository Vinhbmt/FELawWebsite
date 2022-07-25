import React from "react";
import Cookies from 'js-cookie';
import { io } from "socket.io-client";

const token = Cookies.get('token') || null

export const firstSocket = io.connect('localhost:4001', {
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

// export const reconnectSocket = (socket) => {
//   if(socket == null) 
// }


export const SocketContext = React.createContext({
  socket: firstSocket,

  setSocket: () => { },
  call: {},
  callAccepted: false,
  myVideo: null,
  userVideo: null,
  stream: null,
  name: "",
  setName: () => { },
  callEnded: false,
  callUser: () => { },
  leaveCall: () => { },
  answerCall: () => { },

});