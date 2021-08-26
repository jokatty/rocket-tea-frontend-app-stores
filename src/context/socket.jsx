import React, { createContext } from 'react';
import { io } from 'socket.io-client';
import { SOCKET_URL } from '../config/config.mjs';

export const socket = io.connect(SOCKET_URL);
export const SocketContext = createContext();
