import { SignalData } from 'simple-peer';

export interface GameserverSignalData {
  playerId: string;
  data: SignalData;
}
