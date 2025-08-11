import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getSocket } from './chatSocketSingleton';

type UseChatSocketProps = {
  onUserOnline?: (message: any) => void;
  
};

export const useChatSocket = ({ onUserOnline }: UseChatSocketProps) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = getSocket();
    socketRef.current = socket;

    const handleConnect = () => {
      console.log('🔌 Đã kết nối socket thành công!');
      setIsConnected(true);
    };

    const handleDisconnect = () => {
      console.log('❌ Đã ngắt kết nối socket');
      setIsConnected(false);
    };

    const handleUserOnline = (message: any) => {
      // console.log('📩 New message:', message);
      onUserOnline?.(message);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('user_online', handleUserOnline);
 
    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
       socket.off('user_online', handleUserOnline);
    };
  }, [onUserOnline]);



  return {
    socket: socketRef.current,
    isConnected,
  };
};

