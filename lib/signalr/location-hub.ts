import * as SignalR from '@microsoft/signalr';

const API_URL = process.env.EXPO_PUBLIC_API_URL;

class SignalRService {
  private static instance: SignalRService;
  private connection: SignalR.HubConnection;

  private constructor() {
    this.connection = new SignalR.HubConnectionBuilder()
      .withUrl(`${API_URL}/location-hub`)
      .configureLogging(SignalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
  }

  public static getInstance(): SignalRService {
    if (!SignalRService.instance) {
      SignalRService.instance = new SignalRService();
    }
    return SignalRService.instance;
  }

  public getConnection(): SignalR.HubConnection {
    return this.connection;
  }

  public async startConnection(): Promise<void> {
    if (this.connection.state === SignalR.HubConnectionState.Disconnected) {
      await this.connection.start();
    }
  }

  public async stopConnection(): Promise<void> {
    if (this.connection.state === SignalR.HubConnectionState.Connected) {
      await this.connection.stop();
    }
  }
}

export default SignalRService;
