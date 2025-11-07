import { useEffect, useRef, useState } from 'react';
import { Socket } from 'socket.io-client';
import { getSocket } from './chatSocketSingleton';

type UseChatSocketProps = {
  onUserOnline?: (message: any) => void;
  onStart?: (message: any) => void;
  onRobot?: (message: any) => void;
  onSuccess?: (message: any) => void;
  onError?: (message: any) => void;
  onStop?: (message: any) => void;
};

export const useChatSocket = ({ onStart, onRobot, onSuccess, onError, onStop }: UseChatSocketProps) => {
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


    const handleOnStart = (message: any) => {
      onStart?.(message);
    };

    const handleOnRobot = (message: any) => {
      onRobot?.(message);
    };

    const handleOnSuccess = (message: any) => {
      onSuccess?.(message);
    };

    const handleOnError = (message: any) => {
      onError?.(message);
    };

    const handleOnStop = (message: any) => {
      onStop?.(message);
    };

    socket.on('connect', handleConnect);
    socket.on('disconnect', handleDisconnect);
    socket.on('start', handleOnStart);
    socket.on('robot', handleOnRobot);
    socket.on('success', handleOnSuccess);
    socket.on('error', handleOnError);
    socket.on('stop', handleOnStop);

    return () => {
      socket.off('connect', handleConnect);
      socket.off('disconnect', handleDisconnect);
      socket.off('start', handleOnStart);
      socket.off('robot', handleOnRobot);
      socket.off('success', handleOnSuccess);
      socket.off('error', handleOnError);
      socket.off('stop', handleOnStop);
    };
  }, [onStart, onRobot, onSuccess, onError, onStop]);



  return {
    socket: socketRef.current,
    isConnected,
  };
};

