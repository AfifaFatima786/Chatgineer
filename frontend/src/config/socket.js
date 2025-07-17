import { io } from "socket.io-client";

let socketInstance = null;

export const initialiseSocket = () => {
  if (!socketInstance) {
    socketInstance = io(import.meta.env.VITE_API_URL, {
      withCredentials: true
    });
    console.log('Connection made');
  }
  return socketInstance;
};

export const sendMessage = (eventName, data) => {
  if (socketInstance) {
    socketInstance.emit(eventName, data);
  } else {
    console.error("Socket not initialized");
  }
};

export const receiveMessage = (eventName, cb) => {
  if (socketInstance) {
    socketInstance.on(eventName, cb);
  } else {
    console.error("Socket not initialized");
  }
};
