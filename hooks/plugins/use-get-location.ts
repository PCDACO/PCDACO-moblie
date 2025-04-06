import * as SignalR from '@microsoft/signalr';
import { useEffect } from 'react';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export const useSignalRLocation = (userId: string) => {
  useEffect(() => {
    const connection = new SignalR.HubConnectionBuilder()
      .withUrl(`${API_URL}/location-hub`)
      .withAutomaticReconnect()
      .build();
    connection.on('ReceiveLocation', (carId: string, latitude: number, longitude: number) => {
      console.log(carId, latitude, longitude);
    });

    connection.start();

    return () => {
      connection.stop();
    };
  }, []);
};
