// socket/index.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket;

export const initSocket = (token: string) => {
  socket = io('http://localhost:3000', {
    auth: { token },
    transports: ['websocket']
  });

  socket.on('connect', () => {
    console.log('✅ Socket connected:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('❌ Socket disconnected');
  });

  return socket;
};

export const getSocket = () => socket;
