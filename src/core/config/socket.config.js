import React from "react";
import Cookies from 'js-cookie';
import {io} from "socket.io-client";

const token = Cookies.get('token') || null

export const socket = io.connect('localhost:4001', {
         query: {
           token: token
         }
       });
export const SocketContext = React.createContext();