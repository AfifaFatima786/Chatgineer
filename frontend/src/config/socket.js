import { io } from "socket.io-client";

let socketInstance = null;

export const initialiseSocket = (projectId) => {
  // If socket already exists and is connected, return it
  if (socketInstance && socketInstance.connected) {
    return socketInstance;
  }
  
  // If socket exists but is disconnected, disconnect it first
  if (socketInstance) {
    socketInstance.disconnect();
  }
  
  // Create new socket instance
  socketInstance = io(import.meta.env.VITE_API_PATH, {
    withCredentials: true,
    query: {
      projectId
    }
  });
  
  console.log('Connection made');
  console.log(socketInstance);
  
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
    // Return a cleanup function to remove the listener
    return () => {
      socketInstance.off(eventName, cb);
    };
  } else {
    console.error("Socket not initialized");
    return () => {}; // Return empty cleanup function
  }
};

export const removeMessage = (eventName, cb) => {
  if (socketInstance) {
    socketInstance.off(eventName, cb);
  }
};

export const disconnectSocket = () => {
  if (socketInstance) {
    socketInstance.disconnect();
    socketInstance = null;
  }
};
