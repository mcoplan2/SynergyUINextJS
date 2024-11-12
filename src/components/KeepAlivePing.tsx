// components/KeepAlivePing.tsx
import { useEffect } from 'react';
import API from '../utils/API';

const KeepAlivePing = () => {
  useEffect(() => {
    // Define the ping function
    const pingServer = async () => {
      try {
        const response = await API.get('/ping');
        console.log('Ping response:', response.data); // Logs 'pong' if successful
      } catch (error) {
        console.error('Ping error:', error);
      }
    };

    // Initial ping when the component mounts
    pingServer();

    // Set up a recurring ping every 5 minutes
    const interval = setInterval(pingServer, 570000); // 9 minutes 30 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return null; // This component renders nothing, just runs the ping logic
};

export default KeepAlivePing;